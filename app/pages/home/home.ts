import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {BanksPage} from '../banks/banks';
import {PatchesPage} from '../patches/patches';
import {PatchPage} from '../patch/patch';
import {ConfigurationsPage} from '../configurations/configurations';

import {SrIcon} from '../../components/sr-icon/sr-icon';

import {JsonService} from '../../service/json/json-service';
import {CurrentService} from '../../service/json/current-service';
import {BanksService} from '../../service/json/banks-service';

import {DataService} from '../../service/data/data-service';


@Component({
  templateUrl: 'build/pages/home/home.html',
  directives: [SrIcon]
})
export class HomePage {
  constructor(
      private nav : NavController,
      private jsonService : JsonService,
      private data : DataService) {
    // ws injected in the first page to start web socket connection
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
    const goToCurrent = data => this.openPagesForCurrent(data.bank, data.patch);
    this.service.currentData().subscribe(goToCurrent);
  }

  private openPagesForCurrent(bankIndex : number, patchIndex : number) {
    this.banksService.getBanks().subscribe(banksData => {
      this.data.server = banksData;

      let params : any = {};
      params.bank = banksData.banks[bankIndex];
      params.patch = params.bank.patches[patchIndex];

      this.nav.push(BanksPage, {current: true})
          .then(() => this.nav.push(PatchesPage, params))
          .then(() => this.nav.push(PatchPage, params));
    });
  }

  goToConfigurations() {
    this.nav.push(ConfigurationsPage);
  }
}
