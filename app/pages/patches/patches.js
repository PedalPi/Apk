import {Page, NavController, Alert} from 'ionic-angular';
import {PatchPage} from '../patch/patch';

@Page({
  templateUrl: 'build/pages/patches/patches.html'
})
export class PatchesPage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;
    this.items = [
      {title: 'General'},
      {title: 'Rock'},
      {title: 'Clean'}
    ];
  }

  createPatch() {
    let alert = Alert.create({
      title: 'New patch',
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

  itemSelected(patch) {
    this.nav.push(PatchPage, {'patch': patch});
  }
}
