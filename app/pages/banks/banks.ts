import {Page, NavController, ActionSheet} from 'ionic-angular';
import {PatchesPage} from '../patches/patches';

import {JsonService} from '../../service/json';
import {AlertCommon} from '../../common/alert';

@Page({
  templateUrl: 'build/pages/banks/banks.html'
})
export class BanksPage {
  nav : NavController;
  jsonService : JsonService;
  banks;

  constructor(nav : NavController, jsonService : JsonService) {
    this.nav = nav;
    this.jsonService = jsonService;
    this.banks = [{'name':'Test'}, {name: 'Bola'}];
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

  onContextBank(bank) {
    const contextMenu = ActionSheet.create({
      title: bank.name,
      cssClass: 'context',
      buttons: [{
          text: 'Reorder',
          handler: () => {
            console.log('Beta 2.10 https://github.com/driftyco/ionic/issues/5595');
            console.log('http://codepen.io/leoz/pen/MwYxmj');
          }
        }, {
          text: 'Remove',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            console.log('https://github.com/driftyco/ionic/issues/5073');
          }
        }, {
          text: 'Rename',
          handler: () => {
            console.log('Rename clicked');
          }
        }, {
          text: 'Copy to local',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    this.nav.present(contextMenu);
  }
}
