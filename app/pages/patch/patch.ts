import {Page, NavController, NavParams, Alert, IONIC_DIRECTIVES} from 'ionic-angular';
import {Component} from '@angular/core';

import {SrSlider} from '../../components/sr-slider/sr-slider';
import {SrCombobox} from '../../components/sr-combobox/sr-combobox';

@Page({
  templateUrl: 'build/pages/patch/patch.html',
  directives: [SrSlider, SrCombobox]
})
export class PatchPage {
  private nav : NavController;
  private params : NavParams;
  public patch : Object;
  public parameter : Object;

  constructor(nav : NavController, params : NavParams) {
    this.nav = nav;
    this.patch = params.get('patch');

    this.parameter = {
      name: 'Parameter example',
      min: 0,
      max: 100,
      current: 55
    };
  }

  chat() {
    console.log("Teste");
  }
}
