import {SrPedalboard} from '../../components/sr-pedalboard/sr-pedalboard';

import {Effect} from '../../components/sr-pedalboard/pedalboard/model/effect';

import {Pedalboard} from '../../plugins-manager/model/pedalboard';
import {Lv2Effect} from '../../plugins-manager/model/lv2/lv2-effect';
import {Connection} from '../../plugins-manager/model/connection';


export class SrPedalboardFacade {

  constructor(private pedalboardElement: SrPedalboard, private pedalboard: Pedalboard) {}

  load() {
    for (let effect of this.generateEffects(this.pedalboard))
      this.pedalboardElement.append(effect);

    for (let connection of this.pedalboard.connections)
      this.pedalboardElement.connect(this.source(connection), this.target(connection));
  }

  private source(connection : Connection) {
    let effectSource = connection.output.constructor.name == 'SystemOutput' ? this.systemEffect : this.effects[connection.output.effect.index]
    return this.output(effectSource, connection.output.symbol);
  }

  private target(connection : Connection) {
    let effectTarget = connection.input.constructor.name == 'SystemInput' ? this.systemEffect : this.effects[connection.input.effect.index]
    return this.input(effectTarget, connection.input.symbol);
  }

  private get systemEffect() {
    return this.pedalboardElement.systemEffect;
  }

  get effects() : Array<Effect> {
    return this.pedalboardElement.effects;
  }

  private generateEffects(pedalboard : Pedalboard) : Array<Effect> {
    let positions;

    if ('pedalpi-apk' in pedalboard.data)
      positions = pedalboard.data['pedalpi-apk'].effectPositions;

    const effects = [];

    for (let i=0; i<pedalboard.effects.length; i++) {
      const effect = pedalboard.effects[i];
      const position = positions[i];
      const x = position != undefined ? position.x : 150 + 200 * i;
      const y = position != undefined ? position.y : 280

      effects.push(new Effect(x, y, (<Lv2Effect> effect).plugin, effect));
    }

    return effects;
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
