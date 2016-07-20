import {Page, NavController} from 'ionic-angular';
import {PatchesPage} from '../patches/patches';

import {JsonService} from '../../service/jsonService';
import {AlertCommon} from '../../common/alert';
import {ContextMenu} from '../../common/contextMenu';


@Page({
  templateUrl: 'build/pages/banks/banks.html'
})
export class BanksPage {
  public banks;
  public reordering;

  constructor(private nav : NavController, private jsonService : JsonService) {
    this.banks = [{'name':'Test'}, {name: 'Bola'}];
    this.reordering = false;
  }

  ngOnInit() {
    this.jsonService.banks.getBanks().subscribe(
      data => this.banks = data.banks
    );
  }

  itemSelected(bank) {
    this.nav.push(PatchesPage, {'bank': bank});
  }

  createBank() {
    let alert = AlertCommon.generate('New bank', data => {
      const bank = {'name':data.name};
      this.jsonService.banks.saveBank(bank).subscribe(
        status => this.banks.push(bank)
      );
    });

    this.nav.present(alert);
  }

  onContextBank(bank) {
    const contextMenu = new ContextMenu(bank.name, 'context');

    contextMenu.addItem('Reorder', () => {
      console.log('Beta 2.10 https://github.com/driftyco/ionic/issues/5595');
      this.reordering = !this.reordering;
    });

    contextMenu.addItem('Remove', () => {
      //https://github.com/driftyco/ionic/issues/5073
      const alert = AlertCommon.alert('R u sure?', () => this.banks.splice(this.banks.indexOf(bank), 1));
      this.nav.present(alert);
    });

    contextMenu.addItem('Rename', () => {
      let alert = AlertCommon.generate('Rename bank', data => bank.name = data.name, bank.name);
      this.nav.present(alert);
    });

    //contextMenu.addItem('Copy to local', () => console.log('Cancel clicked'));

    this.nav.present(contextMenu.generate());
  }

  reorderItems($event) {
    console.log($event);
  }

  save() {
    this.reordering = false;
  }
}
