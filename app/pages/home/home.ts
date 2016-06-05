import {Page, NavController, NavParams} from 'ionic-angular';
import {BanksPage} from '../banks/banks';


@Page({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  constructor(private nav : NavController) {
  }

  goToPedalPi() {
    this.nav.push(BanksPage);
  }
}
