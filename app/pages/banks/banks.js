import {Page, NavController, Alert} from 'ionic-angular';
import {PatchesPage} from '../patches/patches';

import {JsonService} from '../../service/json';
import {AlertCommon} from '../../common/alert';

@Page({
  templateUrl: 'build/pages/banks/banks.html'
})
export class BanksPage {
  static get parameters() {
    return [[NavController], [JsonService]];
  }

  constructor(nav, jsonService) {
    this.nav = nav;
    this.jsonService = jsonService;
    this.banks = [{'name':'test'}];
  }

  ngOnInit() {
    this.jsonService.requestBanks().subscribe(
      data => this.banks = data.banks
    );
  }

  itemSelected(bank) {
    this.nav.push(PatchesPage, {'bank': bank});
  }

  createBank() {
    let alert = AlertCommon.generate('New bank', data => console.log(data));
    this.nav.present(alert);
  }
}
