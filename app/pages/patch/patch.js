import {Page, NavController, NavParams, Alert, IONIC_DIRECTIVES} from 'ionic-angular';
import {Component} from '@angular/core';

import {EffectTab} from '../effect/effect';
import {HomePage} from '../home/home';
import {SrSlider} from '../../components/sr-slider/sr-slider';
import {SrCombobox} from '../../components/sr-combobox/sr-combobox';

@Page({
  templateUrl: 'build/pages/patch/patch.html',
  directives: [SrSlider, SrCombobox]
})
export class PatchPage {
  static get parameters() {
    return [[NavController], [NavParams]];
  }

  constructor(nav, params) {
    this.nav = nav;
    this.patch = params.get('patch');

    this.parameter = {
      name: 'Parameter example',
      min: 0,
      max: 100,
      current: 55
    };

    this.tab1Root = PatchPage;
  }

  chat() {
    console.log("Teste");
  }
}
