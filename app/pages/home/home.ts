import {Page, NavController, NavParams} from 'ionic-angular';
import {BanksPage} from '../banks/banks';


@Page({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  nav : NavController;
  navParams : NavParams;

  constructor(nav : NavController, navParams : NavParams) {
    this.nav = nav;
    this.navParams = navParams;
  }

  goToPedalPi() {
    this.nav.push(BanksPage);
  }
}
