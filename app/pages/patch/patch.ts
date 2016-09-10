import {Component, QueryList, ViewChild} from '@angular/core';
import {ModalController, NavController, NavParams} from 'ionic-angular';

import {JsonService} from '../../service/json-service';

import {PatchEffectsModal} from '../patch-effects/patch-effects-modal';

import {SrCombobox} from '../../components/sr-combobox/sr-combobox';
import {SrKnob} from '../../components/sr-knob/sr-knob';
import {SrParamKnob} from '../../components/sr-param-knob/sr-param-knob';
import {SrSlider} from '../../components/sr-slider/sr-slider';
import {SrTab} from '../../components/sr-tabs/sr-tab';
import {SrTabs} from '../../components/sr-tabs/sr-tabs';
import {SrToggle} from '../../components/sr-toggle/sr-toggle';

import {EffectsListModal} from '../effects-list/effects-list-modal';


@Component({
  templateUrl: 'build/pages/patch/patch.html',
  directives: [SrCombobox, SrKnob, SrSlider, SrTab, SrTabs, SrToggle, SrParamKnob]
})
export class PatchPage {
  @ViewChild(SrTabs) tabs: SrTabs;

  public patch : any;
  public bank : any;

  constructor(
      private nav : NavController,
      private modal : ModalController,
      params : NavParams,
      private jsonService : JsonService
    ) {
    this.bank = params.get('bank');
    this.toPatch(params.get('patch'));
  }

  private get service() {
    return this.jsonService.param;
  }

  private get currentService() {
    return this.jsonService.current;
  }

  public toBeforePatch() {
    this.toPatch(this.beforePatch);
  }

  public get beforePatch() : Object {
    return this.getBeforePatch();
  }

  private getBeforePatch() : Object {
    let index = this.getIndex(this.patch) - 1;
    if (index == -1)
      index = this.bank.patches.length-1;

    return this.bank.patches[index];
  }

  public toNextPatch() {
    this.toPatch(this.nextPatch);
  }

  public get nextPatch() : Object {
    return this.getNextPatch();
  }

  private getNextPatch() : Object {
    let index = this.getIndex(this.patch) + 1;
    if (index == this.bank.patches.length)
      index = 0;

    return this.bank.patches[index];
  }

  private toPatch(patch : Object) {
    this.patch = patch;

    this.currentService.setPatch(this.bank, patch)
        .subscribe(() => {});

    if (this.tabs)
      this.tabs.selectTab(0);
  }

  private getIndex(patch) : number {
    return this.bank.patches.indexOf(patch);
  }

  public manageEffects() {
    const params = {
      bank: this.bank,
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
    param.value = newValue;

    this.service.updateParam(this.bank, this.patch, effect, param).subscribe(() => {});
    console.log(`Param ${param.name}: ${param.value}`);
  }

  public isEnumaration(param) {
    return param.properties.indexOf('enumeration') != -1;
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

  toggleEffectStatus(effect) {
    const update = () => effect.status = !effect.status;
    this.currentService.toggleStatusEffect(this.bank, this.patch, effect)
        .subscribe(update);
  }
}
