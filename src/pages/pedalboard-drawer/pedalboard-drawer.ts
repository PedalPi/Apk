import {Component, ViewChild} from '@angular/core';
import {NavParams} from 'ionic-angular';

import {SrPedalboard} from '../../components/sr-pedalboard/sr-pedalboard';
import {Effect} from '../../components/sr-pedalboard/pedalboard2/model/effect';

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
      let source, target;
      //let effectSource = connection.output.effect == undefined ? this.systemEffect : this.effects[connection.output.effect]
      //let source = Util.output(effectSource, connection.output.symbol);

      //let effectTarget = connection.input.effect == undefined ? this.systemEffect : this.effects[connection.input.effect]
      //let target = Util.output(effectTarget, connection.input.symbol);

      if (connection.output.effect == undefined)
        continue;
      else
        source = Util.output(this.effects[connection.output.effect], connection.output.symbol);

      if (connection.input.effect == undefined)
        continue;
      else
        target = Util.input(this.effects[connection.input.effect], connection.input.symbol);

      this.pedalboardElement.connect(source, target);
    }

    //this.pedalboardElement.onConnectionAdded = connection => console.log('Connection added', connection);
  }

  removeSeleted() {
    this.pedalboardElement.removeSeleted();
  }

  get effects() : Array<Effect> {
    return this.pedalboardElement.effects;
  }

  get systemEffect() {
    return null;//this.pedalboardElement.systemEffect;
  }
}

class Util {
  static generateEffects(pedalboard) : Array<Effect> {
    const effects = [];
    let i = 0;
    for (let effect of pedalboard['effects'])
      effects.push(new Effect(150 + 200 * (i++), 280, effect['pluginData']));

    return effects;
  }

  static input(effect : Effect, symbol : string) {
    return this.plug(effect.inputs, symbol);
  }

  static output(effect : Effect, symbol : string) {
    return this.plug(effect.outputs, symbol);
  }

  private static plug(plugs : any, symbol : string) {
    return plugs.filter(plug => plug.data.symbol == symbol)[0];
  }
}
