import {Component, ViewChild, ApplicationRef} from '@angular/core';
import {ModalController, NavController, NavParams} from 'ionic-angular';

import {JsonService} from '../../providers/json/json-service';
import {WebSocketService} from '../../providers/websocket/web-socket-service';

import {PedalboardEffectsModal} from '../pedalboard-effects/pedalboard-effects-modal';
import {SrTabs} from '../../components/sr-tabs/sr-tabs';

import {EffectsListModal} from '../effects-list/effects-list-modal';

import {PedalboardPresenter} from './pedalboard-presenter';

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
      private ws : WebSocketService
    ) {
    const bank = params.get('bank');
    this.presenter = new PedalboardPresenter(this, jsonService);
    this.toPedalboard(params.get('pedalboard'));
    this.currentEffect = this.pedalboard.effects[0];
  }

  ionViewWillEnter() {
    this.ws.clearListeners();

    this.ws.onCurrentPedalboardChangeListener = (bank, pedalboard) => this.toPedalboard(pedalboard);
    this.ws.onPedalboardCUDListener = (message, pedalboard) => {
      if (message.updateType == 'UPDATED')
        this.toPedalboard(pedalboard);
    };
  }

  private get currentService() {
    return this.jsonService.current;
  }

  public toBeforePedalboard() {
    this.toPedalboard(this.beforePedalboard);
  }

  public get beforePedalboard() : Pedalboard {
    return this.presenter.getBeforePedalboardOf(this.pedalboard);
  }

  public toNextPedalboard() {
    this.toPedalboard(this.nextPedalboard);
  }

  public get nextPedalboard() : Pedalboard {
    return this.presenter.getNextPedalboardOf(this.pedalboard);
  }

  private toPedalboard(pedalboard : Pedalboard) {
    this.pedalboard = pedalboard;
    this.ref.tick();

    this.presenter.requestSetCurrentPedalboard(this.pedalboard);
    this.currentEffect = this.pedalboard.effects[0];

    if (this.tabs)
      this.tabs.selectTab(0);
  }

  public manageEffects() {
    const params = {
      bank: this.pedalboard.bank,
      pedalboard: this.pedalboard,
      jsonService: this.jsonService
    };

    const modal = this.modal.create(PedalboardEffectsModal, params);
    modal.onDidDismiss(data => {
      if (!data) return;

      this.tabs.selectTab(data.index);
      this.tabs.focusTab(data.index);
    });

    modal.present();
  }

  public onParamUpdated(param : Lv2Param, newValue : number) {
    this.presenter.requestUpdateParam(param, newValue);
    console.log(`Param ${param.data.name}: ${param.value}`);
  }

  setEffect() {
    const data = {
      jsonService : this.jsonService
    };

    const modal = this.modal.create(EffectsListModal, data);
    modal.onDidDismiss(newEffect => {
      if (newEffect) {
        let oldEffect = this.pedalboard.effects[this.tabs.current];

        console.log("Effect selected");
        console.log(newEffect);

        console.log("Old effect");
        console.log(oldEffect);
      }
    });

    modal.present();
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
}
