import {Page, NavController, NavParams, Alert, IONIC_DIRECTIVES} from 'ionic-angular';
import {Component} from '@angular/core';

import {EffectTab} from '../effect/effect';

@Page({
  templateUrl: 'build/pages/patch/patch.html'
})
export class PatchPage {
  static get parameters() {
    return [[NavController], [NavParams]];
  }

  constructor(nav, params) {
    this.nav = nav;
    this.patch = params.get('patch');
  }
}

/*
@Component({
  selector: 'effect-tabs',
  templateUrl: 'build/pages/patch/tabs.html',
  directives: [IONIC_DIRECTIVES]
})
export class EffectTabsComponent {
  constructor() {
    this.tab1Root = EffectTab;
    this.tab2Root = EffectTab;
  }
}
*/

@Component({
  selector: 'my-component',
  template: '<div>Hello my name is {{name}}. <button (click)="sayMyName()">Say my name</button></div>',
  directives: [IONIC_DIRECTIVES]
})
class MyComponent {
  constructor() {
    this.name = 'Max'
  }

  sayMyName() {
    console.log('My name is', this.name)
  }

  ngOnInit() {
    console.log('loaded');
  }
}
