import {Component} from '@angular/core';
import {NavController, AlertController, ActionSheetController} from 'ionic-angular';
import {PatchesPage} from '../patches/patches';

import {JsonService} from '../../service/jsonService';
import {AlertCommon, AlertBuilder} from '../../common/alert';
import {ContextMenu} from '../../common/contextMenu';

import {BankGenerator} from '../../generator/modelGenerator';
import {BanksPresenter} from './banks-presenter';


@Component({
  templateUrl: 'build/pages/banks/banks.html'
})
export class BanksPage {
  public reordering : boolean;
  private presenter : BanksPresenter;

  constructor(
      private nav : NavController,
      private alert : AlertController,
      private actionSheet : ActionSheetController,
      jsonService : JsonService
    ) {
    this.presenter = new BanksPresenter(this, jsonService);
    this.reordering = false;
  }

  get banks() {
    return this.presenter.banks;
  }

  ngOnInit() {
    this.presenter.requestBanks();
  }

  itemSelected(bank) {
    this.nav.push(PatchesPage, {'bank': bank});
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

    contextMenu.addItem('Reorder', () => this.reordering = !this.reordering);

    contextMenu.addItem('Remove', () => {
      let alert = new AlertBuilder(this.alert)
        .title('R u sure?')
        .callback(data => this.presenter.requestDeleteBank(bank))
        .generationConfirmAlert();

      alert.present();
    });

    contextMenu.addItem('Rename', () => {
      let alert = new AlertBuilder(this.alert)
        .title('Rename bank')
        .defaultValue(bank.name)
        .callback(data => this.presenter.requestRenameBank(bank, data))
        .generateSaveAlert();

      alert.present();
    });

    //contextMenu.addItem('Copy to local', () => console.log('Cancel clicked'));

    //contextMenu.generate(this.actionSheet).present();
    window.setTimeout(() => {
      const alert = new AlertBuilder(this.alert)
        .title('')
        .callback(data => console.log("test"))
        .generationConfirmAlert();

      alert.present();
    }, 3000);
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
