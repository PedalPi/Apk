import {Component, ViewChild, ApplicationRef} from '@angular/core';
import {ViewController, ToastController, ModalController, NavController, NavParams} from 'ionic-angular';

import {JsonService} from '../../providers/json/json-service';
import {WebSocketService} from '../../providers/websocket/web-socket-service';
import {UpdateType} from '../../providers/websocket/pedalpi-message-decoder';

import {SrTabs} from '../../components/sr-tabs/sr-tabs';
import {SrSetCurrent} from '../../components/sr-set-current/sr-set-current';

import {PedalboardPresenter} from './pedalboard-presenter';
import {PedalboardDrawerPage} from '../pedalboard-drawer/pedalboard-drawer';

import {Navigator} from '../../common/navigator';

import {Effect} from '../../plugins-manager/model/effect';
import {Pedalboard} from '../../plugins-manager/model/pedalboard';
import {Bank} from '../../plugins-manager/model/bank';

import {Lv2Param} from '../../plugins-manager/model/lv2/lv2-param';


@Component({
  selector: 'page-pedalboard',
  templateUrl: 'pedalboard.html',
})
export class PedalboardPage {
  @ViewChild(SrTabs) tabs: SrTabs;
  @ViewChild(SrSetCurrent) currentComponent: SrSetCurrent;

  public pedalboard : Pedalboard;
  public currentEffect : Effect;

  private presenter: PedalboardPresenter;

  constructor(
      private nav : NavController,
      private modal : ModalController,
      private params : NavParams,
      private jsonService : JsonService,
      private ref: ApplicationRef,
      private ws : WebSocketService,
      private toastCtrl : ToastController,
      private viewController : ViewController,
      private navigator : Navigator
    ) {
    this.presenter = new PedalboardPresenter(this, jsonService);

    this.pedalboard = params.get('pedalboard');
    this.currentEffect = this.pedalboard.effects[0];
  }

  ionViewDidLoad() {
    this.toPedalboard(this.pedalboard, this.currentEffect);
  }

  ionViewWillEnter() {
    this.ws.clearListeners();

    this.ws.messageDecoder.onNotificationBank = (updateType : UpdateType, bank : Bank) => {
      if (updateType == UpdateType.UPDATED && this.pedalboard.bank.index == -1) {
        this.presentToast(`Bank of the current pedalboard has been updated`);
        // It's necessary call goToBack instread this.nav.pop().then(() => this.goToBack(bank));
        // because I don't know
        this.goToBack(bank);
        this.nav.pop();
        //this.nav.pop().then(() => this.goToBack(bank));
      }
    }

    this.ws.messageDecoder.onNotificationCurrentPedalboard = pedalboard => {
      this.toPedalboard(pedalboard, undefined, false);
      this.presentToast(`Current pedalboard has changed to "${pedalboard.name}"`);
    }

    this.ws.messageDecoder.onNotificationPedalboard = (updateType, pedalboard) => {
      if (updateType == UpdateType.UPDATED && this.pedalboard.index == -1)
        this.toPedalboard(pedalboard, undefined, false);
    };

    this.ws.messageDecoder.onNotificationEffect = (updateType, effect) => {
      if (updateType == UpdateType.CREATED && effect.pedalboard == this.pedalboard) {
        this.currentEffect = effect;
        this.ref.tick();
        this.setEffectTab(effect);
      }

      if (updateType == UpdateType.REMOVED && effect.pedalboard == this.pedalboard) {
        this.currentEffect = this.pedalboard.effects.length > 0
                           ? this.pedalboard.effects[0]
                           : undefined;
      }
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
    this.goToBack(this.pedalboard.bank);
  }

  private goToBack(bank : Bank) {
    const params = {bank: bank}
    this.navigator.callBackSucess(this.params, params);
  }

  private toPedalboard(pedalboard : Pedalboard, effect? : Effect, notify=true) {
    this.currentComponent.current = pedalboard;
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
    this.navigator
        .push(PedalboardDrawerPage, {pedalboard: this.pedalboard}, {animate: false})
        .thenBackSucess((params) => this.onBackSucess(params.effect));
  }

  private onBackSucess(effect? : Effect) : boolean {
    if (effect) {
      this.currentEffect = effect;
      this.setEffectTab(this.currentEffect);
    }

    return true;
  }
}
