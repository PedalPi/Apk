import {BanksManager} from '../banks-manager'
import {Pedalboard} from './pedalboard'


export class Bank {
  public name : string
  public pedalboards : Pedalboard[]
  public manager : BanksManager

  constructor(name : string) {
    this.name = name
    this.pedalboards = []

    this.manager = null
  }

  get index() {
    return this.manager.banks.indexOf(this)
  }

  json() {
    return {
      'index': this.index,
      'name': this.name,
      'pedalboards': this.pedalboards.map(pedalboard => pedalboard.json())
    }
  }
}
