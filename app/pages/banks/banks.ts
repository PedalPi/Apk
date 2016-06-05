import {Page, NavController} from 'ionic-angular';
import {PatchesPage} from '../patches/patches';

import {JsonService} from '../../service/json';
import {AlertCommon} from '../../common/alert';
import {ContextMenu} from '../../common/contextMenu';

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
    let alert = AlertCommon.generate('New bank', data => this.banks.push({'name':data.name}));
    this.nav.present(alert);
  }

  onContextBank(bank) {
    const contextMenu = new ContextMenu(bank.name, 'context');

    contextMenu.addItem('Reorder', () => {
      console.log('Beta 2.10 https://github.com/driftyco/ionic/issues/5595');
      console.log('http://codepen.io/leoz/pen/MwYxmj');
    });

    contextMenu.addItem('Remove', () => {
      console.log('Destructive clicked');
      console.log('https://github.com/driftyco/ionic/issues/5073');
    });

    contextMenu.addItem('Rename', () => {
      let alert = AlertCommon.generate('Rename bank', data => bank.name = data.name, bank.name);
      this.nav.present(alert);
    });

    //contextMenu.addItem('Copy to local', () => console.log('Cancel clicked'));

    this.nav.present(contextMenu.generate());
  }
}
