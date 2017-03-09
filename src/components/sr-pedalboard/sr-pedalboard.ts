import { ElementRef } from '@angular/core';

import {BanksManager} from '../../plugins-manager/banks-manager';
import {Effect as EffectModel} from '../../plugins-manager/model/effect';

import {Component} from '@angular/core';
import {Pedalboard} from './pedalboard/pedalboard';
import {Effect} from './pedalboard/model/effect';
import {SystemEffect} from './pedalboard/model/system-effect';
import {Output, Input} from './pedalboard/model/plug';

import {Connection} from './pedalboard/model/connection';


/**
 * Based in: https://bl.ocks.org/cjrd/6863459
 */
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

    const systemEffect = new SystemEffect(
      BanksManager.SYSTEM_EFFECT,
      {
        outputs: BanksManager.SYSTEM_EFFECT.outputs,
        inputs: BanksManager.SYSTEM_EFFECT.inputs
      }
    );

    this.pedalboard = new Pedalboard(element, systemEffect);
  }

  clear() {
    this.pedalboard.clear();
  }

  append(effect : Effect) {
    this.pedalboard.addEffect(effect);
  }

  connect(source: Output, target: Input) {
    this.pedalboard.addConnection(source, target, false, false);
  }

  select(effect : EffectModel) {
    const d3Effect = this.pedalboard.effects[effect.index];
    this.pedalboard.select(d3Effect);
  }

  removeSeleted() {
    this.pedalboard.removeSelected();
  }

  set onConnectionAdded(callback : (connection: Connection) => void) {
    this.pedalboard.listener.connectionAdded = callback;
  }

  set onConnectionRemoved(callback : (connection: Connection) => void) {
    this.pedalboard.listener.connectionRemoved = callback;
  }

  set onEffectMoved(callback : (effect: Effect) => void) {
    this.pedalboard.listener.effectDragEnd = callback;
  }

  set onEffectDoubleClick(callback : (effect: Effect) => void) {
    this.pedalboard.listener.effectDoubleClick = callback;
  }

  set onEffectRemoved(callback : (effect: Effect) => void) {
    this.pedalboard.listener.effectRemoved = callback;
  }

  get effects() : Array<Effect> {
    return this.pedalboard.effects;
  }

  get systemEffect() {
    return this.pedalboard.systemEffect;
  }

  get effectPositions() {
    const positions = [];
    for (let effect of this.pedalboard.effects)
      positions.push({x: effect.x, y: effect.y})

    return positions;
  }
}
