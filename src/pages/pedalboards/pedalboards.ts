import {Component} from '@angular/core';
import {NavController, NavParams, AlertController, ActionSheet, ActionSheetController} from 'ionic-angular';
import {TranslateService} from '@ngx-translate/core';
import {PedalboardManagerPage} from '../pedalboard-manager/pedalboard-manager';

import {JsonService} from '../../providers/json/json-service';
import {WebSocketService} from '../../providers/websocket/web-socket-service';
import {UpdateType} from '../../providers/websocket/pedalpi-message-decoder';

import {AlertBuilder} from '../../common/alert';
import {ContextMenu} from '../../common/context-menu';
import {Navigator} from '../../common/navigator';

import {PedalboardsPresenter} from './pedalboards-presenter';

import {Bank} from '../../plugins-manager/model/bank';
import {Pedalboard} from '../../plugins-manager/model/pedalboard';


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
      public actionSheet : ActionSheetController,
      private jsonService : JsonService,
      private ws : WebSocketService,
      private navigator : Navigator,
      public translate: TranslateService
    ) {
    this.presenter = new PedalboardsPresenter(this, params.get('bank'), jsonService);
    this.bank = params.get('bank');
    this.reordering = false;

    if (params.get('current'))
      this.itemSelected(params.get('pedalboard'));
  }

  get alertBuilder() {
    return new AlertBuilder(this.alert, this.translate);
  }

  ionViewWillEnter() {
    this.ws.clearListeners();

    this.ws.messageDecoder.onNotificationBank = (updateType, bank) => {
      const thisBankAffected = this.bank.index == -1;
      if (updateType == UpdateType.UPDATED && thisBankAffected)
        this.bank = bank;

      else if (updateType == UpdateType.REMOVED && thisBankAffected)
        this.nav.pop().then(() => this.presentAlert('WARNING_BANK_REMOVED', {name: bank.name}));
    };
  }

  private presentAlert(message: string, data: any = {}) {
    let builder = this.alertBuilder;
    builder.message(message, data);

    builder.generate()
           .present();
  }

  ionViewWillLeave() {
    this.ws.clearListeners();
  }

  createPedalboard() {
    let callback = pedalboard => this.itemSelected(pedalboard);

    let builder = this.alertBuilder;

    builder.title('NEW_PEDALBOARD')
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

  onContextPedalboard(pedalboard) : boolean {
    if (this.reordering)
      return false;

    new PedalboardsContextMenu(this, this.translate).generate(pedalboard);

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
  requestRenamePedalboard(pedalboard, newName : string) {
    this.presenter.requestRenamePedalboard(pedalboard, newName);
  }

  requestDeletePedalboard(pedalboard : Pedalboard) {
    this.presenter.requestDeletePedalboard(pedalboard)
  }
}

class PedalboardsContextMenu {
  private instance : ActionSheet;

  constructor(private page: PedalboardsPage,
              private translate: TranslateService) {}

  generate(pedalboard : Pedalboard) {
    const contextMenu = new ContextMenu(pedalboard.name, this.translate);

    contextMenu.addItem('REORDER', () => this.reoder(pedalboard));
    contextMenu.addItem('REMOVE', () => this.remove(pedalboard));
    contextMenu.addItem('RENAME', () => this.rename(pedalboard));
    //contextMenu.addItem('Copy to local', () => console.log('Cancel clicked'));

    this.instance = contextMenu.generate(this.page.actionSheet);
    this.instance.present();
  }

  private reoder(pedalboard : Pedalboard) {
    this.page.reordering = !this.page.reordering;
  }

  private remove(pedalboard : Pedalboard) {
    let alert;
    if (pedalboard.bank.pedalboards.length == 1)
      alert = this.generateErrorAlert('ERROR_REMOVE_UNIQUE_PEDALBOARD');
    else
      alert = this.generateConfirmRemoveAlert(pedalboard);

    this.instance.onDidDismiss(() => alert.present());
  }

  private generateErrorAlert(message) {
    let builder = this.page.alertBuilder;

    builder.title('ERROR')
    builder.message(message)

    return builder.generate();
  }

  private generateConfirmRemoveAlert(pedalboard : Pedalboard) {
    let builder = this.page.alertBuilder;

    builder.title(`DELETE`, {name: pedalboard.name})
    builder.message('R_U_SURE')
    builder.callback(data => this.page.requestDeletePedalboard(pedalboard))

    return builder.generateConfirmation();
  }

  private rename(pedalboard : Pedalboard) {
    let builder = this.page.alertBuilder;

    builder.title('RENAME_PEDALBOARD')
    builder.defaultValue(pedalboard.name)
    builder.callback(data => this.page.requestRenamePedalboard(pedalboard, data.name))

    this.instance.onDidDismiss(() => builder.generateSaveAlert().present());
  }
}
