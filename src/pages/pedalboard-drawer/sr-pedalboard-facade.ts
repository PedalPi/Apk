import {SrPedalboard} from '../../components/sr-pedalboard/sr-pedalboard';

import {Effect} from '../../components/sr-pedalboard/pedalboard/model/effect';
import {SystemEffect} from '../../components/sr-pedalboard/pedalboard/model/system-effect';

import {Pedalboard} from '../../plugins-manager/model/pedalboard';
import {Lv2Effect} from '../../plugins-manager/model/lv2/lv2-effect';
import {Connection} from '../../plugins-manager/model/connection';


export class SrPedalboardFacade {

  constructor(private pedalboardElement: SrPedalboard, private pedalboard: Pedalboard) {}

  private get systemEffect() : SystemEffect {
    return this.pedalboardElement.systemEffect;
  }

  private get effects() : Array<Effect> {
    return this.pedalboardElement.effects;
  }

  load() {
    for (let effect of this.generateEffects(this.pedalboard))
      this.pedalboardElement.append(effect);

    for (let connection of this.pedalboard.connections)
      this.pedalboardElement.connect(this.source(connection), this.target(connection));
  }

  private generateEffects(pedalboard : Pedalboard) : Array<Effect> {
    let positions = [];

    if ('pedalpi-apk' in pedalboard.data)
      positions = pedalboard.data['pedalpi-apk'].effectPositions;

    const effects = [];

    for (let i=0; i<pedalboard.effects.length; i++) {
      const effect = pedalboard.effects[i];
      const position = positions[i];
      const x = position != undefined ? position.x : 150 + 200 * i;
      const y = position != undefined ? position.y : 280

      effects.push(new Effect(x, y, effect, (<Lv2Effect> effect).plugin));
    }

    return effects;
  }

  private source(connection : Connection) {
    let effectSource;

    if (connection.output.effect == this.systemEffect.identifier)
      effectSource = this.systemEffect;
    else
      effectSource = this.effects[connection.output.effect.index]

    return this.output(effectSource, connection.output.symbol);
  }

  private target(connection : Connection) {
    let effectTarget;

    if (connection.input.effect == this.systemEffect.identifier)
      effectTarget = this.systemEffect;
    else
      effectTarget = this.effects[connection.input.effect.index]

    return this.input(effectTarget, connection.input.symbol);
  }

  private input(effect: Effect, symbol : string) {
    return this.plug(effect.inputs, symbol);
  }

  private output(effect: Effect, symbol : string) {
    return this.plug(effect.outputs, symbol);
  }

  private plug(plugs : any, symbol : string) {
    return plugs.filter(plug => plug.data.symbol == symbol)[0];
  }
}
