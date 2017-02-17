import {Input} from './input'
import {Connection} from './connection'

import {Port} from './port';


export abstract class Output extends Port {
  connect(input: Input) {
    this.effect.pedalboard.connections.push(new Connection(this, input))
  }

  json() {
    return {
      'effect': this.effect.pedalboard.effects.indexOf(this.effect),
      'symbol': this.symbol,
      'index': this.effect.outputs.indexOf(this),
    }
  }
}
