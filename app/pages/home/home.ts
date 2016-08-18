import {Component} from '@angular/core';
import {NavController , NavParams} from 'ionic-angular';
import {BanksPage} from '../banks/banks';
import {PatchesPage} from '../patches/patches';
import {PatchPage} from '../patch/patch';

import {SrIcon} from '../../components/sr-icon/sr-icon';

import {JsonService} from '../../service/json-service';
import {CurrentService} from '../../service/current-service';

import {BanksService} from '../../service/banks-service';


@Component({
  templateUrl: 'build/pages/home/home.html',
  directives: [SrIcon]
})
export class HomePage {
  constructor(private nav : NavController, private jsonService : JsonService) {}

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
    const goToCurrent = data => this.openPagesForCurrent(data.bank, data.bank.patches[data.patch]);
    this.service.current().subscribe(goToCurrent);
  }

  private openPagesForCurrent(bank, patch) {
    const data = {
      'bank': bank,
      'patch': patch
    };

    this.nav.push(BanksPage).then(() => {
      return this.nav.push(PatchesPage, data);
    }).then(() => {
      return this.nav.push(PatchPage, data);
    });
  }
}
