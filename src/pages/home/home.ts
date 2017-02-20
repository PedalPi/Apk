import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {BanksPage} from '../banks/banks';
import {PedalboardsPage} from '../pedalboards/pedalboards';
import {PedalboardPage} from '../pedalboard/pedalboard';
import {ConfigurationsPage} from '../configurations/configurations';
import {PedalboardDrawerPage} from '../pedalboard-drawer/pedalboard-drawer';
import {PluginsPage} from '../plugins/plugins';

import {JsonService} from '../../providers/json/json-service';
import {CurrentService} from '../../providers/json/current-service';
import {BanksService} from '../../providers/json/banks-service';
import {DataService} from '../../providers/data/data-service';
import {WebSocketService} from '../../providers/websocket/web-socket-service';

import {BanksManager} from '../../plugins-manager/banks-manager'


@Component({
  templateUrl: 'home.html',
})
export class HomePage {
  public connected : boolean = false;

  constructor(
      private nav : NavController,
      private jsonService : JsonService,
      private data : DataService,
      private ws : WebSocketService) {
    // ws injected in the first page to start web socket connection
    ws.onConnectedListener = () => this.loadData();
  }

  get service() : CurrentService {
    return this.jsonService.current;
  }

  get banksService() : BanksService {
    return this.jsonService.banks;
  }

  loadData() {
    this.banksService.getBanks().subscribe(banksData => {
      this.data.remote.manager = BanksManager.generate(banksData);
      this.connected = true;
    });
  }

  goToCurrent() {
    const goToCurrent = data => this.openPagesForCurrent(data.bank, data.pedalboard)
    this.service.current().subscribe(goToCurrent);
  }

  private openPagesForCurrent(bankIndex : number, pedalboardIndex : number) {
    let params : any = {};

    params.bank = this.data.remote.manager.banks[bankIndex];
    params.pedalboard = params.bank.pedalboards[pedalboardIndex];

    const pages = [
      {page: BanksPage, params: params},
      {page: PedalboardsPage, params: params},
      {page: PedalboardPage, params: params}
    ]

    this.nav.insertPages(3, pages)
  }

  goToBanks() {
    this.nav.push(BanksPage);
  }

  goToConfigurations() {
    this.nav.push(ConfigurationsPage);
  }

  goToPedalboardDrawer() {
    let params = {
      pedalboard: this.data.remote.manager.banks[0].pedalboards[0]
    };

    this.nav.push(PedalboardDrawerPage, params);
  }

  goToPlugins() {
    const goTo = (resolve, reject) => this.nav.push(PluginsPage, {resolve: resolve})
    new Promise(goTo).then(data => console.log(data));
  }
}
