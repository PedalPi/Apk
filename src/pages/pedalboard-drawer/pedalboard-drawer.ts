import {Component, ViewChild} from '@angular/core';
import {NavParams} from 'ionic-angular';

import {JsonService} from '../../providers/json/json-service';

import {SrPedalboard} from '../../components/sr-pedalboard/sr-pedalboard';
import {Effect} from '../../components/sr-pedalboard/pedalboard/model/effect';

import {DataService} from '../../providers/data/data-service';


@Component({
  templateUrl: 'pedalboard-drawer.html',
})
export class PedalboardDrawerPage {
  @ViewChild(SrPedalboard) pedalboardElement : SrPedalboard;
  private pedalboard : any;

  constructor(params : NavParams, data : DataService, private jsonService : JsonService) {
    this.pedalboard = params.get('pedalboard');
  }

  private get service() {
    return this.jsonService.pedalboard;
  }

  private get effectService() {
    return this.jsonService.effect;
  }

  ionViewWillEnter() {
    for (let effect of Util.generateEffects(this.pedalboard))
      this.pedalboardElement.append(effect);

    for (let connection of this.pedalboard.connections) {
      let effectSource = connection.output.effect == undefined ? this.systemEffect : this.effects[connection.output.effect]
      let source = Util.output(effectSource, connection.output.symbol);

      let effectTarget = connection.input.effect == undefined ? this.systemEffect : this.effects[connection.input.effect]
      let target = Util.input(effectTarget, connection.input.symbol);

      this.pedalboardElement.connect(source, target);
    }

    this.pedalboardElement.onConnectionAdded = connection => console.log('Connection added', connection);
    this.pedalboardElement.onEffectMoved = effect => {
      console.log(this.pedalboard.effects.indexOf(effect.identifier))
      console.log('Effect moved', effect);
    };
    this.pedalboardElement.onDoubleClick = effect => {
      console.log('Effect double click', effect);
    };
    this.pedalboardElement.onEffectRemoved = effect => {
      const effectIndex = this.pedalboard.effects.indexOf(effect.identifier);
      this.pedalboard.effects.splice(effectIndex, 1);
      //this.service.delete(effect);
    }
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
      effects.push(new Effect(150 + 200 * (i++), 280, effect['pluginData'], effect));

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
