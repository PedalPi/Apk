import {Bank} from './bank'
import {Effect} from './effect'
import {Connection} from './connection'


export class Pedalboard {
  public bank : Bank
  public name : string
  public effects : Effect[]
  public connections : Connection[]
  public data: any

  constructor(name: string) {
    this.name = name
    this.data = {}

    this.effects = []
    this.connections = []
  }

  get index() {
    return this.bank.pedalboards.indexOf(this)
  }

  json() {
    return {
      'name': this.name,
      'effects': this.effects.map(effect => effect.json()),
      'connections': this.connections.map(connection => connection.json()),
      'data': this.data
    }
  }
}
