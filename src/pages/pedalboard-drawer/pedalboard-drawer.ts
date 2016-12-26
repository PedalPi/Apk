import {Component, ViewChild} from '@angular/core';
import {NavParams} from 'ionic-angular';

import {JsonService} from '../../providers/json/json-service';

import {SrPedalboard} from '../../components/sr-pedalboard/sr-pedalboard';
import {Effect} from '../../components/sr-pedalboard/pedalboard/model/effect';

import {Pedalboard} from '../../plugins-manager/model/pedalboard';
import {Lv2Effect} from '../../plugins-manager/model/lv2/lv2-effect';
import {Connection} from '../../plugins-manager/model/connection';

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

    for (let connection of this.pedalboard.connections)
      this.pedalboardElement.connect(this.source(connection), this.target(connection));

    this.pedalboardElement.onConnectionAdded = connection => console.log('Connection added', connection);
    this.pedalboardElement.onEffectMoved = effect => {
      const data = { effectPositions: this.pedalboardElement.effectPositions }
      this.pedalboard.data = {'pedalpi-apk': data};

      this.service.updateData(this.pedalboard, data).subscribe();
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

  private source(connection : Connection) {
    let effectSource = connection.output.constructor.name == 'SystemOutput' ? this.systemEffect : this.effects[connection.output.effect.index]
    return Util.output(effectSource, connection.output.symbol);
  }

  private target(connection : Connection) {
    let effectTarget = connection.input.constructor.name == 'SystemInput' ? this.systemEffect : this.effects[connection.input.effect.index]
    return Util.input(effectTarget, connection.input.symbol);
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
  static generateEffects(pedalboard : Pedalboard) : Array<Effect> {
    let positions;

    if ('pedalpi-apk' in pedalboard.data)
      positions = pedalboard.data['pedalpi-apk'].effectPositions;

    const effects = [];

    let i = 0;
    for (let i=0; i<pedalboard.effects.length; i++) {
      const effect = pedalboard.effects[i];
      const position = positions[i];
      const x = position != undefined ? position.x : 150 + 200 * i;
      const y = position != undefined ? position.y : 280

      effects.push(new Effect(x, y, (<Lv2Effect> effect).plugin, effect));
    }

    return effects;
  }

  static input(effect : Effect, symbol : string) {
    return this.plug(effect.inputs, symbol);
  }

  static output(effect, symbol : string) {
    return this.plug(effect.outputs, symbol);
  }

  private static plug(plugs : any, symbol : string) {
    return plugs.filter(plug => plug.data.symbol == symbol)[0];
  }
}
