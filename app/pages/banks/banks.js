import {Page, NavController, Alert} from 'ionic-angular';
import {PatchesPage} from '../patches/patches';


@Page({
  templateUrl: 'build/pages/banks/banks.html'
})
export class BanksPage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;
  }

  itemSelected(bank) {
    console.log(bank)
    this.nav.push(PatchesPage);
  }

  createBank() {
    let alert = Alert.create({
      title: 'New bank',
      buttons: ['Cancel', {
        text: 'Save',
        handler: data => {
          console.log(data);
        }
      }],
      inputs: [{
        name: 'Nome',
        placeholder: 'Nome'
      }]
    });
    this.nav.present(alert);
  }
}
