import {Effect} from './effect'
import {Input} from './input'
import {Connection} from './connection'


export abstract class Output {
  public symbol: string

  constructor(public effect: Effect) {}

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
