import { Component, ViewChild } from '@angular/core';
import { Content, ToastController, Platform, NavController, NavParams } from 'ionic-angular';

import {WebSocketService} from '../../providers/websocket/web-socket-service';
import {UpdateType} from '../../providers/websocket/pedalpi-message-decoder';

import {Navigator} from '../../common/navigator';
import {FragmentNavigator} from '../../common/fragment/fragment-navigator';

import {PedalboardDrawerPage} from '../pedalboard-drawer/pedalboard-drawer';
import {PedalboardPage} from '../pedalboard/pedalboard';
import {PluginsPage} from '../plugins/plugins';
import {PluginsListModal} from '../plugins-list/plugins-list-modal';

import {Effect} from '../../plugins-manager/model/effect';
import {Pedalboard} from '../../plugins-manager/model/pedalboard';
import {Bank} from '../../plugins-manager/model/bank';


@Component({
  selector: 'page-pedalboard-manager',
  templateUrl: 'pedalboard-manager.html'
})
export class PedalboardManagerPage {
  @ViewChild(PedalboardDrawerPage) pedalboardDrawer : PedalboardDrawerPage;
  @ViewChild(PedalboardPage) pedalboardParametersFragment : PedalboardPage;
  @ViewChild(PluginsPage) pluginsCategoriesFragment : PluginsPage;
  @ViewChild(PluginsListModal) pluginsListFragment : PluginsListModal;

  @ViewChild('splitPane') splitPane : Content;

  public drawerVisible : boolean = true;

  private mediaQuerie : MediaQueryList
  private mediaQuerieCallback : (query: MediaQueryList) => void

  public pedalboard : Pedalboard;
  public fragmentNavigator : FragmentNavigator;

  constructor(
    public nav: NavController,
    public params: NavParams,
    private platform: Platform,
    private ws : WebSocketService,
    private toastCtrl : ToastController,
    private navigator : Navigator) {
    this.mediaQuerieCallback = query => this.updateSplit(query);
    this.pedalboard = params.get('pedalboard');
    this.fragmentNavigator = new FragmentNavigator();
  }

  ionViewDidLoad() {
    const WIDTH = '(max-width: 992px)';
    this.mediaQuerie = this.platform.win().matchMedia(WIDTH);
    this.mediaQuerie.addListener(this.mediaQuerieCallback);
    this.mediaQuerieCallback(this.mediaQuerie)

    this.drawerVisible = !this.mediaQuerie.matches;

    this.fragmentNavigator.register(PedalboardPage, this.pedalboardParametersFragment);
    this.fragmentNavigator.register(PluginsPage, this.pluginsCategoriesFragment);
    this.fragmentNavigator.register(PluginsListModal, this.pluginsListFragment);

    console.log('push')
    this.fragmentNavigator.push(PedalboardPage);
    console.log('pushed')

    this.pedalboardDrawer.ionViewDidLoad();
    //this.pedalboardParametersFragment.ionViewDidLoad();
    //this.pluginsCategoriesFragment.ionViewDidLoad();
  }

  ionViewWillEnter() {
    this.ws.clearListeners();

    this.ws.messageDecoder.onNotificationBank = (updateType : UpdateType, bank : Bank) => {
      if (updateType == UpdateType.UPDATED && this.pedalboard.bank.index == -1) {
        this.presentToast(`Bank of the current pedalboard has been updated`, false);
        // It's necessary call goToBack instread this.nav.pop().then(() => this.goToBack(bank));
        // because I don't know
        this.goToBack(bank);
        this.nav.pop();
        //this.nav.pop().then(() => this.goToBack(bank));
      }
    }

    this.ws.messageDecoder.onNotificationCurrentPedalboard = pedalboard => {
      this.toPedalboard(pedalboard);
      this.presentToast(`Current pedalboard has changed to "${pedalboard.name}"`);
    }

    this.ws.messageDecoder.onNotificationPedalboard = (updateType, pedalboard) => {
      const isCurrentPedalboard = this.pedalboard.index == -1;

      let reloadPedalboard = this.pedalboard;

      if (updateType == UpdateType.UPDATED && isCurrentPedalboard)
        reloadPedalboard = pedalboard;

      this.toPedalboard(reloadPedalboard);
    };

    this.ws.messageDecoder.onNotificationEffect = (updateType, effect) => {
      if (updateType == UpdateType.CREATED && effect.pedalboard == this.pedalboard) {
        this.toPedalboard(this.pedalboard, effect);

      } else if (updateType == UpdateType.REMOVED && effect.pedalboard == this.pedalboard) {
        const effect = this.pedalboard.effects.length > 0
                     ? this.pedalboard.effects[0]
                     : undefined;
        this.toPedalboard(this.pedalboard, effect);
      }
    };
  }

  ionViewWillLeave() {
    this.mediaQuerie.removeListener(this.mediaQuerieCallback);
  }

  ionViewWillUnload() {
    this.goToBack(this.pedalboard.bank);
    this.fragmentNavigator.clearStack();
  }

  private presentToast(message, dismissOnPageChange=true) {
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      dismissOnPageChange: dismissOnPageChange
    }).present();
  }

  private goToBack(bank : Bank) {
    const params = {bank: bank}
    this.navigator.callBackSucess(this.params, params);
  }

  private toPedalboard(pedalboard : Pedalboard, effect? : Effect) {
    this.setPedalboard(pedalboard);
    this.pedalboardParametersFragment.toPedalboard(pedalboard, effect, false);
  }

  public setPedalboard(pedalboard : Pedalboard) {
    this.pedalboard = pedalboard;
    this.pedalboardDrawer.drawPedalboard(pedalboard, true);
  }

  public selectEffect(effect : Effect, doubleClick : boolean) {
    this.pedalboardParametersFragment.setCurrentEffect(effect);
    if (doubleClick && this.drawerVisible)
      this.drawerVisible = false;
  }

  public selectEffectPedalboardManager(effect : Effect) {
    this.pedalboardDrawer.select(effect);
  }

  toggleDrawer() {
    this.drawerVisible = !this.drawerVisible;
  }

  private updateSplit(query : MediaQueryList) {
    let element = this.splitPane.getNativeElement();

    if (!query.matches)
      element.classList.add('split');
    else
      element.classList.remove('split');
  }

  goToPluginsCategories() {
    this.fragmentNavigator.push(PluginsPage);
    if (this.mediaQuerie.matches)
      this.drawerVisible = false;
  }
}
