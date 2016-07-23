import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {PatchesPage} from '../patches/patches';

import {JsonService} from '../../service/jsonService';
import {AlertCommon} from '../../common/alert';
import {ContextMenu} from '../../common/contextMenu';

import {BankGenerator} from '../../generator/modelGenerator';


@Component({
  templateUrl: 'build/pages/banks/banks.html'
})
export class BanksPage {
  public banks;
  public reordering;

  constructor(private nav : NavController, private jsonService : JsonService) {
    this.banks = [];
    this.reordering = false;
  }

  ngOnInit() {
    this.service.getBanks().subscribe(data => this.banks = data.banks);
  }

  private get service() {
    return this.jsonService.banks;
  }

  itemSelected(bank) {
    this.nav.push(PatchesPage, {'bank': bank});
  }

  createBank() {
    let alert = AlertCommon.generate('New bank', data => {
      const bank = BankGenerator.generate(data.name);
      const saveBank = status => {
        bank.index = status.index;
        this.banks.push(bank);
      }

      this.service.saveNewBank(bank).subscribe(saveBank);
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
      const deleteBank = () => this.banks.splice(this.banks.indexOf(bank), 1);
      const requestDeleteBank = () => this.service.deleteBank(bank).subscribe(deleteBank);

      const alert = AlertCommon.alert('R u sure?', requestDeleteBank);

      this.nav.present(alert);
    });

    contextMenu.addItem('Rename', () => {
      const requestRenameBank = data => {
          bank.name = data.name;
          this.service.updateBank(bank).subscribe(() => {});
      };

      let alert = AlertCommon.generate('Rename bank', requestRenameBank, bank.name);

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
