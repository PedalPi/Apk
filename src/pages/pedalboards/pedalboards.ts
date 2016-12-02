import {Component} from '@angular/core';
import {NavController, NavParams, AlertController, ActionSheetController} from 'ionic-angular';
import {PedalboardPage} from '../pedalboard/pedalboard';

import {JsonService} from '../../providers/json/json-service';
import {WebSocketService} from '../../providers/websocket/web-socket-service';

import {AlertBuilder} from '../../common/alert';
import {ContextMenu} from '../../common/contextMenu';

import {PedalboardsPresenter} from './pedalboards-presenter';


@Component({
  templateUrl: 'pedalboards.html',
})
export class PedalboardsPage {
  public bank : any;
  public reordering : boolean;

  private presenter : PedalboardsPresenter;

  constructor(
      private nav : NavController,
      params : NavParams,
      private alert : AlertController,
      private actionSheet : ActionSheetController,
      private jsonService : JsonService,
      private ws : WebSocketService
    ) {
    this.presenter = new PedalboardsPresenter(this, params.get('bank'), jsonService);
    this.bank = params.get('bank');
    this.reordering = false;

    console.log(this.bank);
  }

  ionViewWillEnter() {
    this.ws.clearListeners();

    this.ws.onBankCUDListener = (message, bank) => {
      if (message.updateType == 'UPDATED' && bank.index == this.bank.index)
        this.bank = bank;
      else if (message.updateType == 'DELETED' && bank.index == this.bank.index) {
        this.nav.pop()
        alert("This bank has been deleted!");
      }
    };
  }

  createPedalboard() {
    let alert = new AlertBuilder(this.alert)
      .title('New pedalboard')
      .callback((data) => this.presenter.requestSavePedalboard(data))
      .generateSaveAlert();

    alert.present();
  }

  itemSelected(pedalboard) {
    this.nav.push(PedalboardPage, {'bank': this.bank, 'pedalboard': pedalboard});
  }

  onContextPedalboard(pedalboard) {
    if (this.reordering)
      return;

    const contextMenu = new ContextMenu(pedalboard.name, 'context');
    let contextInstance = null;

    contextMenu.addItem('Reorder', () => this.reordering = !this.reordering);

    contextMenu.addItem('Remove', () => {
      let alert = new AlertBuilder(this.alert)
        .title(`Delete ${pedalboard.name}`)
        .message(`R u sure?`)
        .callback(data => this.presenter.requestDeletePedalboard(pedalboard))
        .generationConfirmAlert();

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
