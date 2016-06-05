import {Page, NavController, NavParams, Alert, IONIC_DIRECTIVES} from 'ionic-angular';
import {Component, QueryList, ViewChild, NgZone} from '@angular/core';

import {SrSlider} from '../../components/sr-slider/sr-slider';
import {SrCombobox} from '../../components/sr-combobox/sr-combobox';
import {SrTabs} from '../../components/sr-tabs/sr-tabs';
import {SrTab} from '../../components/sr-tabs/sr-tab';

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

  public beforePatch() {
    this.toPatch(this.getIndex(this.patch) - 1);
  }

  public nextPatch() {
    this.toPatch(this.getIndex(this.patch) + 1);
  }

  private toPatch(index : number) {
    if (index == -1)
      index = this.bank["patches"].length-1;
    else if (index == this.bank["patches"].length)
      index = 0;

    this.patch = this.bank["patches"][index];
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
}
