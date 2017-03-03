import { Component, ViewChild } from '@angular/core';
import { Content, Platform, NavController, NavParams } from 'ionic-angular';

import {PedalboardDrawerPage} from '../pedalboard-drawer/pedalboard-drawer';
import {PluginsPage} from '../plugins/plugins';



@Component({
  selector: 'page-pedalboard-manager',
  templateUrl: 'pedalboard-manager.html'
})
export class PedalboardManagerPage {
  @ViewChild(PluginsPage) pluginsPage : PluginsPage;

  @ViewChild(PedalboardDrawerPage) pedalboardDrawer : PedalboardDrawerPage;
  //@ViewChild(SrPedalboard) pedalboardElement : SrPedalboard;
  @ViewChild('splitPane') ionContent : Content;

  public showDrawer : boolean = true;
  public showPlugins : boolean = false;

  public split = false;
  private mediaQuerie : MediaQueryList
  private mediaQuerieCallback : (query: MediaQueryList) => void;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform) {
    this.mediaQuerieCallback = query => this.updateSplit(query);
  }

  ionViewDidLoad() {
    const WIDTH = '(max-width: 992px)';
    this.mediaQuerie = this.platform.win().matchMedia(WIDTH);
    this.mediaQuerie.addListener(this.mediaQuerieCallback);
    this.mediaQuerieCallback(this.mediaQuerie)

    this.pedalboardDrawer.ionViewDidLoad();
    this.pluginsPage.ionViewDidLoad();
  }

  ionViewWillLeave() {
    this.mediaQuerie.removeListener(this.mediaQuerieCallback);
  }

  toggleDrawer() {
    this.showDrawer = !this.showDrawer;
  }

  goToPlugins() {
    this.showPlugins = true;
  }

  private updateSplit(query : MediaQueryList) {
    let element = this.ionContent.getNativeElement();

    this.split = !query.matches;
    if (!query.matches)
      element.classList.add('split');
    else
      element.classList.remove('split');
  }
}
