import {Component} from '@angular/core';
import {NavController, NavParams, AlertController, ActionSheetController} from 'ionic-angular';
import {PedalboardManagerPage} from '../pedalboard-manager/pedalboard-manager';

import {JsonService} from '../../providers/json/json-service';
import {WebSocketService} from '../../providers/websocket/web-socket-service';
import {UpdateType} from '../../providers/websocket/pedalpi-message-decoder';

import {AlertBuilder} from '../../common/alert';
import {ContextMenu} from '../../common/context-menu';
import {Navigator} from '../../common/navigator';

import {PedalboardsPresenter} from './pedalboards-presenter';

import {Bank} from '../../plugins-manager/model/bank';


@Component({
  templateUrl: 'pedalboards.html',
})
export class PedalboardsPage {
  public bank : Bank;
  public reordering : boolean;

  private presenter : PedalboardsPresenter;

  constructor(
      private nav : NavController,
      params : NavParams,
      private alert : AlertController,
      private actionSheet : ActionSheetController,
      private jsonService : JsonService,
      private ws : WebSocketService,
      private navigator : Navigator
    ) {
    this.presenter = new PedalboardsPresenter(this, params.get('bank'), jsonService);
    this.bank = params.get('bank');
    this.reordering = false;

    if (params.get('current'))
      this.itemSelected(params.get('pedalboard'));
  }

  ionViewWillEnter() {
    this.ws.clearListeners();

    this.ws.messageDecoder.onNotificationBank = (updateType, bank) => {
      const thisBankAffected = this.bank.index == -1;
      if (updateType == UpdateType.UPDATED && thisBankAffected)
        this.bank = bank;

      else if (updateType == UpdateType.REMOVED && thisBankAffected)
        this.nav.pop().then(() => this.presentAlert(`The bank <b>"${bank.name}"</b> has been deleted`));
    };
  }

  private presentAlert(message) {
    let builder = new AlertBuilder(this.alert);
    builder.message(message);

    builder.generate()
           .present();
  }

  ionViewWillLeave() {
    this.ws.clearListeners();
  }

  createPedalboard() {
    let callback = pedalboard => this.itemSelected(pedalboard);

    let builder = new AlertBuilder(this.alert)

    builder.title('New pedalboard')
    builder.callback((data) => this.presenter.requestSaveNewPedalboard(data, callback))

    builder.generateSaveAlert().present();
  }

  itemSelected(pedalboard) {
    this.navigator
        .push(PedalboardManagerPage, {pedalboard: pedalboard})
        .thenBackSucess((bank? : Bank) => this.onBackSucess(bank));
  }

  public onBackSucess(params) : boolean {
    if (params.bank)
      this.bank = params.bank;

    return true;
  }

  onContextPedalboard(pedalboard) {
    if (this.reordering)
      return;

    const contextMenu = new ContextMenu(pedalboard.name, null);
    let contextInstance = null;

    contextMenu.addItem('Reorder', () => this.reordering = !this.reordering);

    contextMenu.addItem('Remove', () => {
      let alert;
      if (pedalboard.bank.pedalboards.length == 1) {
        let builder = new AlertBuilder(this.alert)
        builder.title('Error')
        builder.message(`A bank must have at least one pedalboard`)
        alert = builder.generate();
      } else {
        let builder = new AlertBuilder(this.alert);
        builder.title(`Delete ${pedalboard.name}`);
        builder.message(`R u sure?`);
        builder.callback(data => this.presenter.requestDeletePedalboard(pedalboard));
        alert = builder.generateConfirmation();
      }
      contextInstance.onDidDismiss(() => alert.present());
    });

    contextMenu.addItem('Rename', () => {
      let builder = new AlertBuilder(this.alert)

      builder.title('Rename pedalboard')
      builder.defaultValue(pedalboard.name)
      builder.callback(data => this.presenter.requestRenamePedalboard(pedalboard, data))

      contextInstance.onDidDismiss(() => builder.generateSaveAlert().present());
    });

    //contextMenu.addItem('Copy to local', () => console.log('Cancel clicked'));

    contextInstance = contextMenu.generate(this.actionSheet);
    contextInstance.present();
  }

  reorderItems(indexes) {
    if (indexes.to == -100)
      indexes.to = 0;

    this.presenter.reorderItems(indexes.from, indexes.to);
  }

  disableReorder() {
    this.reordering = false;
  }
}
