import {Component, QueryList, ViewChild} from '@angular/core';
import {Modal, NavController, NavParams} from 'ionic-angular';

import {JsonService} from '../../service/jsonService';

import {EffectsPage} from './effects';

import {SrSlider} from '../../components/sr-slider/sr-slider';
import {SrCombobox} from '../../components/sr-combobox/sr-combobox';
import {SrTabs} from '../../components/sr-tabs/sr-tabs';
import {SrTab} from '../../components/sr-tabs/sr-tab';
import {SrToggle} from '../../components/sr-toggle/sr-toggle';

@Component({
  templateUrl: 'build/pages/patch/patch.html',
  directives: [SrSlider, SrCombobox, SrTabs, SrTab, SrToggle]
})
export class PatchPage {
  @ViewChild(SrTabs) tabs: SrTabs;

  public patch : any;
  public bank : any;

  constructor(private nav : NavController, params : NavParams, private jsonService : JsonService) {
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
      patch: this.patch
    };
    const modal = Modal.create(EffectsPage, params);
    modal.onDismiss(data => {
      if (!data) return;

      this.tabs.selectTab(data.index);
      this.tabs.focusTab(data.index);
    });

    this.nav.present(modal);
  }

  public onParamUpdated(effect, param) {
    this.service.updateParam(this.bank, this.patch, effect, param).subscribe(() => {});
    console.log(`Param ${param.name}: ${param.value}`);
  }

  public isEnumaration(param) {
    console.log(param.properties.indexOf('enumeration') != -1);
    return param.properties.indexOf('enumeration') != -1;
  }
}
