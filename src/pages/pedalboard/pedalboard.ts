import {Component, ViewChild, ApplicationRef} from '@angular/core';
import {ToastController, ModalController, NavController, NavParams} from 'ionic-angular';

import {JsonService} from '../../providers/json/json-service';
import {WebSocketService} from '../../providers/websocket/web-socket-service';
import {UpdateType} from '../../providers/websocket/pedalpi-message-decoder';

import {SrTabs} from '../../components/sr-tabs/sr-tabs';

import {PedalboardPresenter} from './pedalboard-presenter';
import {PedalboardDrawerPage} from '../pedalboard-drawer/pedalboard-drawer';

import {Effect} from '../../plugins-manager/model/effect';
import {Pedalboard} from '../../plugins-manager/model/pedalboard';

import {Lv2Param} from '../../plugins-manager/model/lv2/lv2-param';


@Component({
  templateUrl: 'pedalboard.html',
})
export class PedalboardPage {
  @ViewChild(SrTabs) tabs: SrTabs;

  public pedalboard : Pedalboard;
  public currentEffect : Effect;

  private presenter: PedalboardPresenter;

  constructor(
      private nav : NavController,
      private modal : ModalController,
      params : NavParams,
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
    this.ws.clearListeners();

    this.ws.messageDecoder.onNotificationCurrentPedalboard = pedalboard => {
      this.toPedalboard(pedalboard);
      this.toastCtrl.create({
        message: `Current pedalboard has changed to "${pedalboard.name}"`,
        duration: 3000,
        dismissOnPageChange: true
      }).present();
    }
    this.ws.messageDecoder.onNotificationPedalboard = (updateType, pedalboard) => {
      if (updateType == UpdateType.UPDATED)
        this.toPedalboard(pedalboard);
    };
  }

  ionViewWillLeave() {
    this.ws.clearListeners();
  }

  private toPedalboard(pedalboard : Pedalboard, effect? : Effect) {
    this.pedalboard = pedalboard;
    this.ref.tick();

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
    const goTo = (resolve, reject) => this.nav.push(
      PedalboardDrawerPage,
      {pedalboard: this.pedalboard, resolve: resolve},
      {animate: false}
    );

    new Promise(goTo).then((effect : Effect) => {
      if (effect) {
        this.currentEffect = effect;
        this.setEffectTab(this.currentEffect);
      }
    });
  }
}
