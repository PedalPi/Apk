import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-pedalboard-manager',
  templateUrl: 'pedalboard-manager.html'
})
export class PedalboardManagerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PedaboardManagerPage');
  }
}
