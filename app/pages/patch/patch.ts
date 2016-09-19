import {Component, QueryList, ViewChild, ApplicationRef} from '@angular/core';
import {ModalController, NavController, NavParams} from 'ionic-angular';

import {JsonService} from '../../service/json/json-service';
import {WebSocketService} from '../../service/websocket/web-socket-service';

import {PatchEffectsModal} from '../patch-effects/patch-effects-modal';

import {SrCombobox} from '../../components/sr-combobox/sr-combobox';
import {SrFootswitch} from '../../components/sr-footswitch/sr-footswitch';
import {SrKnob} from '../../components/sr-knob/sr-knob';
import {SrParamKnob} from '../../components/sr-param-knob/sr-param-knob';
import {SrSlider} from '../../components/sr-slider/sr-slider';
import {SrTab} from '../../components/sr-tabs/sr-tab';
import {SrTabs} from '../../components/sr-tabs/sr-tabs';
import {SrToggle} from '../../components/sr-toggle/sr-toggle';

import {EffectsListModal} from '../effects-list/effects-list-modal';

import {PatchPresenter} from './patch-presenter';

@Component({
  templateUrl: 'build/pages/patch/patch.html',
  directives: [SrCombobox, SrKnob, SrSlider, SrTab, SrTabs, SrToggle, SrParamKnob, SrFootswitch]
})
export class PatchPage {
  @ViewChild(SrTabs) tabs: SrTabs;

  public patch : any;
  public currentEffect : any;

  private presenter: PatchPresenter;

  constructor(
      private nav : NavController,
      private modal : ModalController,
      params : NavParams,
      private jsonService : JsonService,
      private ref: ApplicationRef,
      private ws : WebSocketService
    ) {
    const bank = params.get('bank');
    this.presenter = new PatchPresenter(this, jsonService, bank);
    this.toPatch(params.get('patch'));
    this.currentEffect = this.patch.effects[0];
  }

  ionViewWillEnter() {
    this.ws.clearListeners();
    
    this.ws.onCurrentPatchChangeListener = (bank, patch) => this.toPatch(patch, bank);
    this.ws.onPatchCUDListener = (message, patch) => {
      if (message.updateType == 'UPDATED')
        this.toPatch(patch);
    };
  }

  private get currentService() {
    return this.jsonService.current;
  }

  public toBeforePatch() {
    this.toPatch(this.beforePatch);
  }

  public get beforePatch() : Object {
    return this.presenter.getBeforePatchOf(this.patch);
  }

  public toNextPatch() {
    this.toPatch(this.nextPatch);
  }

  public get nextPatch() : Object {
    return this.presenter.getNextPatchOf(this.patch);
  }

  private toPatch(patch : Object, bank? : Object) {
    if (bank)
      this.presenter.bank = bank;

    this.patch = patch;
    this.ref.tick();

    this.presenter.requestSetCurrentPatch(this.patch);
    this.currentEffect = this.patch.effects[0];

    if (this.tabs)
      this.tabs.selectTab(0);
  }

  public manageEffects() {
    const params = {
      bank: this.presenter.bank,
      patch: this.patch,
      jsonService: this.jsonService
    };

    const modal = this.modal.create(PatchEffectsModal, params);
    modal.onDidDismiss(data => {
      if (!data) return;

      this.tabs.selectTab(data.index);
      this.tabs.focusTab(data.index);
    });

    modal.present();
  }

  public onParamUpdated(effect, param, newValue) {
    this.presenter.requestUpdateParam(this.patch, effect, param, newValue);
    console.log(`Param ${param.name}: ${param.value}`);
  }

  setEffect() {
    const data = {
      jsonService : this.jsonService
    };

    const modal = this.modal.create(EffectsListModal, data);
    modal.onDidDismiss(newEffect => {
      if (newEffect) {
        let oldEffect = this.patch.effects[this.tabs.current];

        console.log("Effect selected");
        console.log(newEffect);

        console.log("Old effect");
        console.log(oldEffect);
      }
    });

    modal.present();
  }

  public toggleEffectStatus(effect) {
    this.presenter.requestToggleStatusEffect(this.patch, effect);
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
    this.currentEffect = this.patch.effects[index];
  }
}
