import {Component, ViewChild} from '@angular/core';
import {NavParams} from 'ionic-angular';

import {SrPedalboard} from '../../components/sr-pedalboard/sr-pedalboard';
import {Effect, Lv2Effect} from '../../components/sr-pedalboard/pedalboard/model/effect';



@Component({
  templateUrl: 'pedalboard-drawer.html',
})
export class PedalboardDrawerPage {
  @ViewChild(SrPedalboard) pedalboardElement : SrPedalboard;
  private pedalboard : any;

  constructor(params : NavParams) {
    this.pedalboard = params.get('pedalboard');
  }

  ionViewWillEnter() {
    for (let effect of Util.generateEffects(this.pedalboard))
      this.pedalboardElement.append(effect);

    for (let connection of this.pedalboard.connections) {
      let effectSource, portSource, effectTarget, portTarget;

      if (connection.output.effect == undefined) {
        effectSource = this.systemEffect;
        portSource = this.systemEffect.outputs.filter(output => output.data == connection.output.symbol)[0];
      } else {
        effectSource = this.effects[connection.output.effect];
        portSource = Util.outputPort(effectSource, connection.output.symbol);
      }

      if (connection.input.effect == undefined) {
        effectTarget = this.systemEffect;
        portTarget = this.systemEffect.inputs.filter(input => input.data == connection.input.symbol)[0];
      } else {
        effectTarget = this.effects[connection.input.effect];
        portTarget = Util.inputPort(effectTarget, connection.input.symbol);
      }

      this.pedalboardElement.connect(effectSource, portSource, effectTarget, portTarget);
    }

    this.pedalboardElement.onConnectionAdded = connection => console.log('Connection added', connection);
  }

  removeSeleted() {
    this.pedalboardElement.removeSeleted();
  }

  get effects() : Array<Effect> {
    return this.pedalboardElement.effects;
  }

  get systemEffect() {
    return this.pedalboardElement.systemEffect;
  }
}

class Util {
  static generateEffects(pedalboard) : Array<Effect> {
    const effects = [];
    let i = 0;
    for (let effect of pedalboard['effects'])
      effects.push(new Lv2Effect(150 + 200 * (i++), 280, effect['pluginData']));

    return effects;
  }

  static inputPort(effect : Effect, symbol : string) {
    return this.port(effect.data.ports.audio.input, symbol);
  }

  static outputPort(effect : Effect, symbol : string) {
    return this.port(effect.data.ports.audio.output, symbol);
  }

  static port(ports : any, symbol : string) {
    return ports.filter(input => input.symbol == symbol)[0];
  }
}
