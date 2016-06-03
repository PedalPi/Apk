import {Page, NavController, NavParams} from 'ionic-angular';
import {BanksPage} from '../banks/banks';


@Page({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  static get parameters() {
    return [[NavController], [NavParams]];
  }

  constructor(nav, navParams) {
    this.nav = nav;
    this.navParams = navParams;
  }

  goToPedalPi() {
    this.nav.push(BanksPage);
  }
}
