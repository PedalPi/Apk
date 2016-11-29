import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {BanksPage} from '../banks/banks';
import {PedalboardsPage} from '../pedalboards/pedalboards';
import {PedalboardPage} from '../pedalboard/pedalboard';
import {ConfigurationsPage} from '../configurations/configurations';

import {SrIcon} from '../../components/sr-icon/sr-icon';

import {JsonService} from '../../service/json/json-service';
import {CurrentService} from '../../service/json/current-service';
import {BanksService} from '../../service/json/banks-service';
import {DataService} from '../../service/data/data-service';
import {WebSocketService} from '../../service/websocket/web-socket-service';

import {ModelUtil} from '../../util/model-util'

@Component({
  templateUrl: 'build/pages/home/home.html',
  directives: [SrIcon]
})
export class HomePage {
  public connected : boolean = false;

  constructor(
      private nav : NavController,
      private jsonService : JsonService,
      private data : DataService,
      private ws : WebSocketService) {
    // ws injected in the first page to start web socket connection
    ws.onConnectedListener = () => this.connected = true;
  }

  get service() : CurrentService {
    return this.jsonService.current;
  }

  get banksService() : BanksService {
    return this.jsonService.banks;
  }

  goToPedalPi() {
    this.nav.push(BanksPage);
  }

  goToCurrent() {
    const goToCurrent = data => this.openPagesForCurrent(data.bank, data.pedalboard);
    this.service.currentData().subscribe(goToCurrent);
  }

  private openPagesForCurrent(bankIndex : number, pedalboardIndex : number) {
    this.banksService.getBanks().subscribe(banksData => {
      this.data.server = banksData;

      let params : any = {};
      params.bank = ModelUtil.getBank(banksData.banks, bankIndex);
      params.pedalboard = params.bank.pedalboards[pedalboardIndex];

      this.nav.push(BanksPage, {current: true})
          .then(() => this.nav.push(PedalboardsPage, params))
          .then(() => this.nav.push(PedalboardPage, params));
    });
  }

  goToConfigurations() {
    this.nav.push(ConfigurationsPage);
  }
}
