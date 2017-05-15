import {Component} from '@angular/core';
import {
  NavController,
  ActionSheet,
  AlertController,
  ActionSheetController,
  NavParams
} from 'ionic-angular';

import {TranslateService} from '@ngx-translate/core';

import {PedalboardsPage} from '../pedalboards/pedalboards';

import {JsonService} from '../../providers/json/json-service';
import {AlertBuilder} from '../../common/alert';
import {ContextMenu} from '../../common/context-menu';

import {BanksPresenter} from './banks-presenter';
import {DataService} from '../../providers/data/data-service';

import {Bank} from '../../plugins-manager/model/bank';


@Component({
  templateUrl: 'banks.html'
})
export class BanksPage {
  public reordering : boolean;
  public presenter : BanksPresenter;

  constructor(
      private nav : NavController,
      public alert : AlertController,
      public actionSheet : ActionSheetController,
      jsonService : JsonService,
      private data : DataService,
      private params : NavParams,
      public translate: TranslateService
    ) {
    this.presenter = new BanksPresenter(this, jsonService, data);
    this.reordering = false;
  }

  get alertBuilder() {
    return new AlertBuilder(this.alert, this.translate);
  }

  get banks() {
    return this.presenter.banks;
  }

  itemSelected(bank) {
    this.nav.push(PedalboardsPage, {'bank': bank});
  }

  createBank() {
    let builder = this.alertBuilder;
    builder.title('NEW_BANK')
    builder.callback(data => this.requestSaveNewBank(data.name));

    builder.generateSaveAlert()
           .present();
  }

  public createError(message) {
    let builder = this.alertBuilder;
    builder.title('ERROR');
    builder.message(message);
    return builder.generate();
  }

  onContextBank(bank) : boolean {
    if (this.reordering)
      return false;

    new BanksContextMenu(this, this.translate).generate(bank);

    return false;
  }

  reorderItems(indexes) {
    if (indexes.to == -100)
      indexes.to = 0;

    this.presenter.reorderItems(indexes.from, indexes.to);
  }

  disableReorder() {
    this.reordering = false;
  }

  //==================================
  // Presenter request
  //==================================
  private async requestSaveNewBank(name: string) {
    try {
      let bank = await this.presenter.requestSaveNewBank(name);
      this.itemSelected(bank);
    } catch (messages) {
      this.createError(messages.toString()).present();
    }
  }

  async requestRenameBank(bank, newName) {
    try {
      await this.presenter.requestRenameBank(bank, newName);
    } catch (messages) {
      this.createError(messages.toString()).present();
    }
  }

  requestDeleteBank(bank : Bank) {
    this.presenter.requestDeleteBank(bank)
  }
}


class BanksContextMenu {
  private instance : ActionSheet;

  constructor(private page: BanksPage,
              private translate: TranslateService) {}

  generate(bank : Bank) {
    const contextMenu = new ContextMenu(bank.name, this.translate);

    //contextMenu.addItem('REORDER', () => this.reoder(bank));
    contextMenu.addItem('REMOVE', () => this.remove(bank));
    contextMenu.addItem('RENAME', () => this.rename(bank));
    //contextMenu.addItem('Copy to local', () => console.log('Cancel clicked'));

    this.instance = contextMenu.generate(this.page.actionSheet);
    this.instance.present();
  }

  private reoder(bank : Bank) {
    this.page.reordering = !this.page.reordering
  }

  private remove(bank : Bank) {
    let alert;

    if (bank.manager.banks.length == 1)
      alert = this.page.createError('ERROR_REMOVE_UNIQUE_BANK');
    else
      alert = this.generateConfirmRemoveAlert(bank);

    this.instance.onDidDismiss(() => alert.present());
  }

  private generateConfirmRemoveAlert(bank : Bank) {
    let builder = this.page.alertBuilder;

    builder.title(`DELETE`, {name: bank.name})
    builder.message('R_U_SURE')
    builder.callback(data => this.page.requestDeleteBank(bank))

    return builder.generateConfirmation();
  }

  private rename(bank : Bank) {
    let builder = this.page.alertBuilder;

    builder.title('RENAME_BANK')
    builder.defaultValue(bank.name)
    builder.callback(data => this.page.requestRenameBank(bank, data.name));

    this.instance.onDidDismiss(() => builder.generateSaveAlert().present());
  }
}
