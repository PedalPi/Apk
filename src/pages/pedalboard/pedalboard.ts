import {Component, ViewChild, ApplicationRef} from '@angular/core';
import {ModalController, NavController, NavParams} from 'ionic-angular';

import {JsonService} from '../../providers/json/json-service';
import {WebSocketService} from '../../providers/websocket/web-socket-service';

import {PedalboardEffectsModal} from '../pedalboard-effects/pedalboard-effects-modal';
import {SrTabs} from '../../components/sr-tabs/sr-tabs';

import {EffectsListModal} from '../effects-list/effects-list-modal';

import {PedalboardPresenter} from './pedalboard-presenter';

@Component({
  templateUrl: 'pedalboard.html',
})
export class PedalboardPage {
  @ViewChild(SrTabs) tabs: SrTabs;

  public pedalboard : any;
  public currentEffect : any;

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
    this.presenter = new PedalboardPresenter(this, jsonService, bank);
    this.toPedalboard(params.get('pedalboard'));
    this.currentEffect = this.pedalboard.effects[0];
  }

  ionViewWillEnter() {
    this.ws.clearListeners();

    this.ws.onCurrentPedalboardChangeListener = (bank, pedalboard) => this.toPedalboard(pedalboard, bank);
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

  public get beforePedalboard() : Object {
    return this.presenter.getBeforePedalboardOf(this.pedalboard);
  }

  public toNextPedalboard() {
    this.toPedalboard(this.nextPedalboard);
  }

  public get nextPedalboard() : Object {
    return this.presenter.getNextPedalboardOf(this.pedalboard);
  }

  private toPedalboard(pedalboard : Object, bank? : Object) {
    if (bank)
      this.presenter.bank = bank;

    this.pedalboard = pedalboard;
    this.ref.tick();

    this.presenter.requestSetCurrentPedalboard(this.pedalboard);
    this.currentEffect = this.pedalboard.effects[0];

    if (this.tabs)
      this.tabs.selectTab(0);
  }

  public manageEffects() {
    const params = {
      bank: this.presenter.bank,
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

  public onParamUpdated(effect, param, newValue) {
    this.presenter.requestUpdateParam(this.pedalboard, effect, param, newValue);
    console.log(`Param ${param.name}: ${param.value}`);
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

  public toggleEffectStatus(effect) {
    this.presenter.requestToggleStatusEffect(this.pedalboard, effect);
  }

  public isKnob(parameter) : boolean {
    return this.presenter.isParameterKnob(parameter);
  }

  public isCombobox(parameter) : boolean {
    return this.presenter.isParameterCombobox(parameter);
  }

  public isToggle(parameter) : boolean {
    return this.presenter.isParameterToggle(parameter);
  }

  public get hasCurrentEffect() {
    return this.currentEffect !== undefined;
  }
  public get currentEffectStatus() {
    if (this.hasCurrentEffect)
      return this.currentEffect.status;
    else
      return false;
  }

  public parameterType(parameter) : string {
    return this.presenter.parameterType(parameter);
  }

  public setCurrentEffect(index) {
    this.currentEffect = this.pedalboard.effects[index];
  }
}
