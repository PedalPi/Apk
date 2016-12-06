import { ElementRef } from '@angular/core';

import {Component} from '@angular/core';
import {Pedalboard} from './pedalboard/pedalboard';
import {Effect, SystemEffect} from './pedalboard/model/effect';
import {Port} from './pedalboard/model/port';
import {Connection} from './pedalboard/model/connection';

import * as d3 from 'd3';


@Component({
  selector: 'sr-pedalboard',
  templateUrl: 'sr-pedalboard.html',
})
export class SrPedalboard {
  private pedalboard : Pedalboard;
  public element : any;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnInit() {
    const element = d3.select(this.element.querySelector('#sr-pedalboard'));

    const systemEffect = new SystemEffect(['playback_1', 'playback_2'], ['capture_1', 'capture_2']);
    this.pedalboard = new Pedalboard(element, systemEffect);
  }

  append(effect : Effect) {
    this.pedalboard.addEffect(effect);
  }

  connect(effectSource : Effect, portSource, effectTarget : Effect, portTarget) {
    this.pedalboard.addConnection(effectSource, portSource, effectTarget, portTarget);
  }

  removeSeleted() {
    this.pedalboard.removeSelected();
  }

  set onConnectionAdded(callback : (connection: Connection) => void) {
    this.pedalboard.onConnectionAdded = callback;
  }

  set onConnectionRemoved(callback : (connection: Connection) => void) {
    this.pedalboard.onConnectionRemoved = callback;
  }

  set onEffectRemoved(callback : (effect: Effect) => void) {
    this.pedalboard.onEffectRemoved = callback;
  }

  get effects() : Array<Effect> {
    return this.pedalboard.effects;
  }

  get systemEffect() {
    return this.pedalboard.systemEffect;
  }
}
