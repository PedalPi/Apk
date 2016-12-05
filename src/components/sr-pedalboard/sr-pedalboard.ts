import { ElementRef } from '@angular/core';

import {Component} from '@angular/core';
import {Pedalboard} from './pedalboard/pedalboard';
import {Effect} from './pedalboard/model/effect';
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
    this.pedalboard = new Pedalboard(d3.select(this.element.querySelector('#sr-pedalboard')), [], []);
    this.pedalboard.update();
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
}
