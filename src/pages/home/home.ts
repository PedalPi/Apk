import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {TranslateService} from '@ngx-translate/core';

import {BanksPage} from '../banks/banks';
import {PedalboardsPage} from '../pedalboards/pedalboards';
import {ConfigurationsPage} from '../configurations/configurations';
import {PedalboardManagerPage} from '../pedalboard-manager/pedalboard-manager';

import {JsonService} from '../../providers/json/json-service';
import {CurrentService} from '../../providers/json/current-service';
import {BanksService} from '../../providers/json/banks-service';
import {PluginService} from '../../providers/json/plugin-service';
import {DataService} from '../../providers/data/data-service';
import {WebSocketService} from '../../providers/websocket/web-socket-service';

import {BanksManager} from '../../plugins-manager/banks-manager'
import {LoadingController} from 'ionic-angular';


@Component({
  templateUrl: 'home.html',
})
export class HomePage {
  public connected : boolean = false;

  constructor(
      translate: TranslateService,
      private nav : NavController,
      private jsonService : JsonService,
      private data : DataService,
      private ws : WebSocketService,
      private loadingCtrl : LoadingController) {
    // ws injected in the first page to start web socket connection
    ws.onConnectedListener = () => this.loadData();
    ws.onErrorListener = () => this.goToConfigurations();

    translate.setDefaultLang('en');
  }

  ionViewWillLeave() {
    this.ws.clearListeners();
  }

  private get service() : CurrentService {
    return this.jsonService.current;
  }

  private get banksService() : BanksService {
    return this.jsonService.banks;
  }

  private get pluginService() : PluginService {
    return this.jsonService.plugin;
  }

  loadData() {
    const loading = this.loadingCtrl.create({content: "Getting data"});
    loading.present();

    this.pluginService.getPlugins().subscribe(plugins => {
      this.data.updatePlugins(plugins.plugins);

      this.banksService.getBanks().subscribe(banksData => {
        const plugins = this.data.remote.plugins;
        this.data.remote.manager = BanksManager.generate(banksData, plugins);
        this.connected = true;

        loading.dismiss();
      });
    });
  }

  goToCurrent() {
    const goToCurrent = data => this.openPagesForCurrent(data.bank, data.pedalboard)
    this.service.current().subscribe(goToCurrent);
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

    this.nav.insertPages(pages.length, pages, {animate: false})
  }

  goToBanks() {
    this.nav.push(BanksPage);
  }

  goToConfigurations() {
    this.nav.push(ConfigurationsPage);
  }
}
