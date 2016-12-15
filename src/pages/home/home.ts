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

import {ModelUtil} from '../../util/model-util'

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

    document.querySelector('body').webkitRequestFullscreen();
  }

  get service() : CurrentService {
    return this.jsonService.current;
  }

  get banksService() : BanksService {
    return this.jsonService.banks;
  }

  loadData() {
    this.banksService.getBanks().subscribe(banksData => {
      this.data.remote = banksData;

      this.connected = true;
    });
  }

  goToCurrent() {
    const goToCurrent = data => this.openPagesForCurrent(data.bank, data.pedalboard);
    this.service.currentData().subscribe(goToCurrent);
  }

  goToBanks() {
    this.nav.push(BanksPage);
  }

  private openPagesForCurrent(bankIndex : number, pedalboardIndex : number) {
    let params : any = {};

    params.bank = ModelUtil.getBank(this.data.remote.banks, bankIndex);
    params.pedalboard = params.bank.pedalboards[pedalboardIndex];

    this.nav.push(BanksPage)
        .then(() => this.nav.push(PedalboardsPage, params))
        .then(() => this.nav.push(PedalboardPage, params));
  }

  goToConfigurations() {
    this.nav.push(ConfigurationsPage);
  }

  goToPedalboardDrawer() {
    //document.querySelector('body').webkitRequestFullscreen();
    //(<any> window.screen).orientation.lock('landscape').then(alert, alert);

    let params = {
      pedalboard: ModelUtil.getBank(this.data.remote.banks, 0)['pedalboards'][0]
    };

    this.nav.push(PedalboardDrawerPage, params);
  }

  goToPlugins() {
    this.nav.push(PluginsPage);
  }
}
