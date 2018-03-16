import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ToastController, LoadingController, ModalController, AlertController} from 'ionic-angular';

import {TranslateService} from '@ngx-translate/core';

import {BanksPage} from '../banks/banks';
import {PedalboardsPage} from '../pedalboards/pedalboards';
import {ConfigurationsPage} from '../configurations/configurations';

import {JsonService} from '../../providers/json/json-service';
import {CurrentService} from '../../providers/json/current-service';
import {DataService} from '../../providers/data/data-service';
import {WebSocketService} from '../../providers/websocket/web-socket-service';
import {ConnectionView} from '../../providers/websocket/connection-view';
import {LanguageService} from '../../providers/lang/language';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  constructor(
      private nav : NavController,
      private jsonService : JsonService,
      private data : DataService,
      private ws : WebSocketService, // ws injected in the first page to start web socket connection
      private translate: TranslateService,
      private loadingCtrl : LoadingController,
      toastCtrl: ToastController,
      modalCtrl: ModalController,
      alertCtrl: AlertController) {

    const view = new ConnectionView(loadingCtrl, toastCtrl, modalCtrl, data, jsonService, translate);
    ws.view = view;
    view.onDataLoaded = () => this.prepareGoToCurrent();

    this.translate.setDefaultLang(LanguageService.navigatorLanguage());
    this.data.addOnReadyListener(() => this.loadLanguage());
  }

  private async prepareGoToCurrent() {
    await this.goToCurrent();
    this.ws.view.dismiss();
  }

  public get connected() {
    return this.ws.connected;
  }

  private loadLanguage() {
    this.translate.setDefaultLang(this.data.language);
  }

  ionViewWillLeave() {
    this.ws.clearListeners();
  }

  private get service() : CurrentService {
    return this.jsonService.current;
  }

  async goToCurrent() {
    const data = await this.service.current().toPromise();
    return this.openPagesForCurrent(data.bank, data.pedalboard);
  }

  private openPagesForCurrent(bankIndex : number, pedalboardIndex : number) {
    let params : any = {};

    params.current = true;
    params.bank = this.data.remote.manager.banks[bankIndex];
    params.pedalboard = params.bank.pedalboards[pedalboardIndex];

    const pages = [
      {page: BanksPage, params: params},
      {page: PedalboardsPage, params: params},
      //{page: PedalboardPage, params: params}
    ]

    return this.nav.insertPages(pages.length, pages, {animate: false});
  }

  goToBanks() {
    this.nav.push(BanksPage);
  }

  goToConfigurations() {
    this.nav.push(ConfigurationsPage);
  }
}
