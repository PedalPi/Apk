import {BanksManager} from '../banks-manager'
import {Pedalboard} from './pedalboard'


export class Bank {
  public index : number
  public name : string
  public pedalboards : Pedalboard[]
  public manager : BanksManager

  constructor(name : string) {
    this.name = name
    this.pedalboards = []

    this.manager = null
  }

  json() {
    return {
      'index': this.index,
      'name': this.name,
      'pedalboards': this.pedalboards.map(pedalboard => pedalboard.json)
    }
  }
}
