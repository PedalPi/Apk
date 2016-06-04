import {Page, NavController, NavParams, Alert, IONIC_DIRECTIVES} from 'ionic-angular';
import {Component} from '@angular/core';

import {SrSlider} from '../../components/sr-slider/sr-slider';
import {SrCombobox} from '../../components/sr-combobox/sr-combobox';
import {SrTabs} from '../../components/sr-tabs/sr-tabs';
import {SrTab} from '../../components/sr-tabs/sr-tab';

@Page({
  templateUrl: 'build/pages/patch/patch.html',
  directives: [SrSlider, SrCombobox, SrTabs, SrTab]
})
export class PatchPage {
  private nav : NavController;
  private params : NavParams;
  public patch : Object;

  constructor(nav : NavController, params : NavParams) {
    this.nav = nav;
    this.patch = params.get('patch');
  }
}
