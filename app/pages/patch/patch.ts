import {Page, ViewController, Modal, NavController, NavParams, Alert, IONIC_DIRECTIVES} from 'ionic-angular';
import {Component, QueryList, ViewChild, NgZone} from '@angular/core';

import {SrSlider} from '../../components/sr-slider/sr-slider';
import {SrCombobox} from '../../components/sr-combobox/sr-combobox';
import {SrTabs} from '../../components/sr-tabs/sr-tabs';
import {SrTab} from '../../components/sr-tabs/sr-tab';

import {AlertCommon} from '../../common/alert';

@Page({
  templateUrl: 'build/pages/patch/patch.html',
  directives: [SrSlider, SrCombobox, SrTabs, SrTab]
})
export class PatchPage {
  @ViewChild(SrTabs) tabs: SrTabs;

  public patch : Object;
  public bank : Object;

  constructor(private nav : NavController, params : NavParams) {
    this.patch = params.get('patch');
    this.bank = params.get('bank');
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
      index = this.bank["patches"].length-1;

    return this.bank["patches"][index];
  }


  public toNextPatch() {
    this.toPatch(this.nextPatch);
  }

  public get nextPatch() : Object {
    return this.getNextPatch();
  }

  private getNextPatch() : Object {
    let index = this.getIndex(this.patch) + 1;
    if (index == this.bank["patches"].length)
      index = 0;

    return this.bank["patches"][index];
  }


  private toPatch(patch : Object) {
    this.patch = patch;
    this.tabs.ngAfterContentInit();
  }

  private getIndex(patch) : number {
    let index : number = 0;

    for (let patch of this.bank["patches"]) {
      if (patch === this.patch)
        return index;
      index++;
    }

    return -1;
  }

  public manageEffects() {
    const modal = Modal.create(EffectsManagement, { patch: this.patch });
    this.nav.present(modal);
  }
}

@Page({
  templateUrl: 'build/pages/patch/effects.html'
})
class EffectsManagement {
  public patch : Object;
  public mode : string = 'normal';

  constructor(private nav : NavController, params: NavParams, private controller: ViewController) {
    this.patch = params.get('patch');
  }

  close() {
    this.controller.dismiss();
  }

  newEffect() {
    //const modal = Modal.create(EffectsManagement, { patch: this.patch });
    //this.nav.present(modal);
    this.patch["effects"].push(this.patch['effects'][0]);
  }

  get removeMode() {
    return this.mode == 'remove';
  }

  toRemoveMode() {
    this.mode = 'remove';
  }

  toNormalMode() {
    this.mode = 'normal';
  }

  remove(index : number) {
    console.log(index);
    this.patch["effects"].splice(index, 1);
  }
}
