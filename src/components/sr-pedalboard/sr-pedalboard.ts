import { ElementRef } from '@angular/core';

import {Component} from '@angular/core';
import {Pedalboard} from './pedalboard/pedalboard';
import {Effect} from './pedalboard/model/effect';
import {SystemEffect} from './pedalboard/model/system-effect';
import {Output, Input} from './pedalboard/model/plug';

import {Connection} from './pedalboard/model/connection';


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
    const element = this.element.querySelector('#sr-pedalboard');

    const systemEffect = new SystemEffect({
      outputs: [{symbol: 'capture_1'}, {symbol: 'capture_2'}],
      inputs: [{symbol: 'playback_1'}, {symbol: 'playback_2'}]
    });
    this.pedalboard = new Pedalboard(element, systemEffect);
  }

  append(effect : Effect) {
    this.pedalboard.addEffect(effect);
  }

  connect(source: Output, target: Input) {
    this.pedalboard.addConnection(source, target);
  }

  removeSeleted() {
    this.pedalboard.removeSelected();
  }

  /*
  set onConnectionAdded(callback : (connection: Connection) => void) {
    this.pedalboard.onConnectionAdded = callback;
  }

  set onConnectionRemoved(callback : (connection: Connection) => void) {
    this.pedalboard.onConnectionRemoved = callback;
  }

  set onEffectRemoved(callback : (effect: Effect) => void) {
    this.pedalboard.onEffectRemoved = callback;
  }
  */

  get effects() : Array<Effect> {
    return this.pedalboard.effects;
  }

  get systemEffect() {
    return this.pedalboard.systemEffect;
  }
}
