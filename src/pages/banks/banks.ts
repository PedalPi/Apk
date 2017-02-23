import {Component} from '@angular/core';
import {
  NavController,
  AlertController,
  ActionSheetController,
  NavParams
} from 'ionic-angular';

import {PedalboardsPage} from '../pedalboards/pedalboards';

import {JsonService} from '../../providers/json/json-service';
import {AlertBuilder} from '../../common/alert';
import {ContextMenu} from '../../common/contextMenu';

import {BanksPresenter} from './banks-presenter';
import {DataService} from '../../providers/data/data-service';


@Component({
  templateUrl: 'banks.html'
})
export class BanksPage {
  public reordering : boolean;
  private presenter : BanksPresenter;

  constructor(
      private nav : NavController,
      private alert : AlertController,
      private actionSheet : ActionSheetController,
      jsonService : JsonService,
      private data : DataService,
      private params : NavParams
    ) {
    this.presenter = new BanksPresenter(this, jsonService, data);
    this.reordering = false;
  }

  get banks() {
    return this.presenter.banks;
  }

  itemSelected(bank) {
    this.nav.push(PedalboardsPage, {'bank': bank});
  }

  createBank() {
    let alert = new AlertBuilder(this.alert)
      .title('New bank')
      .callback((data) => this.presenter.requestSaveBank(data))
      .generateSaveAlert();

    alert.present();
  }

  onContextBank(bank) {
    if (this.reordering)
      return;

    const contextMenu = new ContextMenu(bank.name, 'context');
    let contextInstance = null;

    contextMenu.addItem('Reorder', () => this.reordering = !this.reordering);

    contextMenu.addItem('Remove', () => {
      let alert;
      if (bank.manager.banks.length == 1) {
        alert = new AlertBuilder(this.alert)
          .title('Error')
          .message(`There must be at least one bank`)
          .generateSimple();
      } else {
        alert = new AlertBuilder(this.alert)
          .title(`Delete ${bank.name}`)
          .message('R u sure?')
          .callback(data => this.presenter.requestDeleteBank(bank))
          .generateConfirmAlert();
      }
      contextInstance.onDidDismiss(() => alert.present());
    });

    contextMenu.addItem('Rename', () => {
      let alert = new AlertBuilder(this.alert)
        .title('Rename bank')
        .defaultValue(bank.name)
        .callback(data => this.presenter.requestRenameBank(bank, data))
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
