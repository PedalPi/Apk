import {Component, ViewChild, ApplicationRef} from '@angular/core';
import {ToastController, ModalController, NavController, NavParams} from 'ionic-angular';

import {JsonService} from '../../providers/json/json-service';
import {WebSocketService} from '../../providers/websocket/web-socket-service';
import {UpdateType} from '../../providers/websocket/pedalpi-message-decoder';

import {SrTabs} from '../../components/sr-tabs/sr-tabs';

import {PedalboardPresenter} from './pedalboard-presenter';
import {PedalboardDrawerPage} from '../pedalboard-drawer/pedalboard-drawer';

import {Navigator} from '../../common/navigator';

import {Effect} from '../../plugins-manager/model/effect';
import {Pedalboard} from '../../plugins-manager/model/pedalboard';
import {Bank} from '../../plugins-manager/model/bank';

import {Lv2Param} from '../../plugins-manager/model/lv2/lv2-param';


@Component({
  templateUrl: 'pedalboard.html',
})
export class PedalboardPage {
  @ViewChild(SrTabs) tabs: SrTabs;

  public pedalboard : Pedalboard;
  public currentEffect : Effect;

  private presenter: PedalboardPresenter;
  private ionViewWillUnloadCallbackEnabled = true;

  constructor(
      private nav : NavController,
      private modal : ModalController,
      private params : NavParams,
      private jsonService : JsonService,
      private ref: ApplicationRef,
      private ws : WebSocketService,
      private toastCtrl : ToastController
    ) {
    this.presenter = new PedalboardPresenter(this, jsonService);

    this.pedalboard = params.get('pedalboard');
    this.currentEffect = this.pedalboard.effects[0];
  }

  ionViewDidLoad() {
    this.toPedalboard(this.pedalboard, this.currentEffect);
  }

  ionViewWillEnter() {
    this.ionViewWillUnloadCallbackEnabled = true;
    this.ws.clearListeners();

    this.ws.messageDecoder.onNotificationBank = (updateType : UpdateType, bank : Bank) => {
      if (updateType == UpdateType.UPDATED && this.pedalboard.bank.index == -1) {
        this.presentToast(`Bank of the current pedalboard has been updated`);
        this.ionViewWillUnloadCallbackEnabled = false;
        this.nav.pop().then(() => this.goToBack(bank));
      }
    }

    this.ws.messageDecoder.onNotificationCurrentPedalboard = pedalboard => {
      this.toPedalboard(pedalboard, undefined, false);
      this.presentToast(`Current pedalboard has changed to "${pedalboard.name}"`);
    }

    this.ws.messageDecoder.onNotificationPedalboard = (updateType, pedalboard) => {
      if (updateType == UpdateType.UPDATED && this.pedalboard.bank.index == -1)
        this.toPedalboard(pedalboard, undefined, false);
    };
  }

  private presentToast(message) {
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      dismissOnPageChange: true
    }).present();
  }

  ionViewWillLeave() {
    this.ws.clearListeners();
  }

  ionViewWillUnload() {
    if (this.ionViewWillUnloadCallbackEnabled)
      this.goToBack(this.pedalboard.bank);
  }

  private goToBack(bank : Bank) {
    const callback = this.params.get('resolve');

    if (callback)
      callback(bank);
  }

  private toPedalboard(pedalboard : Pedalboard, effect? : Effect, notify=true) {
    this.pedalboard = pedalboard;
    this.ref.tick();

    if (notify)
      this.presenter.requestSetCurrentPedalboard(this.pedalboard);
    this.currentEffect = effect ? effect : this.pedalboard.effects[0];

    if (this.hasCurrentEffect)
      this.setEffectTab(this.currentEffect)
  }

  private setEffectTab(effect) {
    this.tabs.selectTab(effect.index);
    this.tabs.focusTab(effect.index);
  }

  public onParamUpdated(param : Lv2Param, newValue : number) {
    this.presenter.requestUpdateParam(param, newValue);
    console.log(`Param ${param.data.name}: ${param.value}`);
  }

  public toggleEffectStatus(effect : Effect) {
    this.presenter.requestToggleStatusEffect(effect);
  }

  public get hasCurrentEffect() {
    return this.currentEffect !== undefined;
  }

  public get currentEffectStatus() {
    if (this.hasCurrentEffect)
      return this.currentEffect.active;
    else
      return false;
  }

  public setCurrentEffect(index : number) {
    this.currentEffect = this.pedalboard.effects[index];
  }

  public goToConnections() {
    const nav = new Navigator(this.nav);

    nav.push(PedalboardDrawerPage, {pedalboard: this.pedalboard}, {animate: false})
       .thenBackSucess((effect? : Effect) => this.onBackSucess(effect));
  }

  private onBackSucess(effect? : Effect) : boolean {
    if (effect) {
      this.currentEffect = effect;
      this.setEffectTab(this.currentEffect);
    }

    return true;
  }
}
