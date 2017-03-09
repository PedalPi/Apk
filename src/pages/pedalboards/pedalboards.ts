import {Component} from '@angular/core';
import {NavController, NavParams, AlertController, ActionSheetController} from 'ionic-angular';
import {PedalboardManagerPage} from '../pedalboard-manager/pedalboard-manager';

import {JsonService} from '../../providers/json/json-service';
import {WebSocketService} from '../../providers/websocket/web-socket-service';
import {UpdateType} from '../../providers/websocket/pedalpi-message-decoder';

import {AlertBuilder} from '../../common/alert';
import {ContextMenu} from '../../common/contextMenu';
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
    new AlertBuilder(this.alert)
      .message(message)
      .generate()
      .present()
  }

  ionViewWillLeave() {
    this.ws.clearListeners();
  }

  createPedalboard() {
    let alert = new AlertBuilder(this.alert)
      .title('New pedalboard')
      .callback((data) => this.presenter.requestSavePedalboard(data))
      .generateSaveAlert();

    alert.present();
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

    const contextMenu = new ContextMenu(pedalboard.name, 'context');
    let contextInstance = null;

    contextMenu.addItem('Reorder', () => this.reordering = !this.reordering);

    contextMenu.addItem('Remove', () => {
      let alert;
      if (pedalboard.bank.pedalboards.length == 1) {
        alert = new AlertBuilder(this.alert)
          .title('Error')
          .message(`A bank must have at least one pedalboard`)
          .generate();
      } else {
        alert = new AlertBuilder(this.alert)
          .title(`Delete ${pedalboard.name}`)
          .message(`R u sure?`)
          .callback(data => this.presenter.requestDeletePedalboard(pedalboard))
          .generateConfirmation();
      }
      contextInstance.onDidDismiss(() => alert.present());
    });

    contextMenu.addItem('Rename', () => {
      let alert = new AlertBuilder(this.alert)
        .title('Rename pedalboard')
        .defaultValue(pedalboard.name)
        .callback(data => this.presenter.requestRenamePedalboard(pedalboard, data))
        .generateSaveAlert();

      contextInstance.onDidDismiss(() => alert.present());
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
