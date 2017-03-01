import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {PedalboardDrawerPage} from '../pedalboard-drawer/pedalboard-drawer';
import {PluginsPage} from '../plugins/plugins';


@Component({
  selector: 'page-pedalboard-manager',
  templateUrl: 'pedalboard-manager.html'
})
export class PedalboardManagerPage {
  @ViewChild(PedalboardDrawerPage) pedalboardDrawer : PedalboardDrawerPage;
  //@ViewChild(SrPedalboard) pedalboardElement : SrPedalboard;
  @ViewChild(PluginsPage) pluginsPage : PluginsPage;

  public showDrawer : boolean = true;
  public showPlugins : boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.pedalboardDrawer.ionViewDidLoad();
    this.pluginsPage.ionViewDidLoad();
  }

  toggleDrawer() {
    this.showDrawer = !this.showDrawer;
  }

  goToPlugins() {
    this.showPlugins = true;
  }
}
