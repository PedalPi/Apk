import { ElementRef } from '@angular/core';

import {Component} from '@angular/core';
import {Pedalboard} from './pedalboard2/pedalboard2';
import {Effect} from './pedalboard2/model/effect';
import {Output, Input} from './pedalboard2/model/plug';

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

    //const systemEffect = new SystemEffect(['playback_1', 'playback_2'], ['capture_1', 'capture_2']);
    this.pedalboard = new Pedalboard(element);
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
  /*
  get systemEffect() {
    return this.pedalboard.systemEffect;
  }
  */
}
