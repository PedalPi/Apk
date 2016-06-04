import {Page, NavController, ActionSheet} from 'ionic-angular';
import {PatchesPage} from '../patches/patches';

import {JsonService} from '../../service/json';
import {AlertCommon} from '../../common/alert';
import {LongPressDirective} from '../../directives/longPress.directive';

@Page({
  templateUrl: 'build/pages/banks/banks.html',
  directives: [LongPressDirective]
})
export class BanksPage {
  nav : NavController;
  jsonService : JsonService;
  banks;

  constructor(nav : NavController, jsonService : JsonService) {
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

  onContextBank(event, bank) {
    const contextMenu = ActionSheet.create({
      title: bank.name,
      cssClass: 'context',
      buttons: [{
          text: 'Remove',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
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
