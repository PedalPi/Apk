import {Pedalboard} from './pedalboard'
import {Connection} from './connection'
import {Param} from './param'
import {Input} from './input'
import {Output} from './output'


export class Effect {
  public pedalboard : Pedalboard
  public active : boolean = true
  public params : Param[] = []
  public inputs : Input[] = []
  public outputs : Output[] = []

  get index() {
    return this.pedalboard.effects.indexOf(this);
  }

  toggle() {
    this.active = !this.active
  }

  connections() {
    const isPedalboardConnection =
      connection => connection.input.effect == this
                || connection.output.effect == this

    return this.pedalboard.connections.filter(isPedalboardConnection)
  }

  json() {
    return {}
  }
}
