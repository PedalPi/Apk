import {Port} from './port';

export abstract class Input extends Port {
  json() {
    return {
      'effect': this.effect.pedalboard.effects.indexOf(this.effect),
      'symbol': this.symbol,
      'index': this.effect.inputs.indexOf(this),
    }
  }
}
