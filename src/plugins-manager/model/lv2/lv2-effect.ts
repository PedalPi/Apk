import {Effect} from '../effect'
import {Lv2Input} from './lv2-input'
import {Lv2Output} from './lv2-output'
import {Lv2Param} from './lv2-param'


export class Lv2Effect extends Effect {
  public plugin: any

  constructor(plugin) {
    super()
    this.plugin = plugin

    this.params = plugin["ports"]["control"]["input"].map(param => new Lv2Param(this, param))

    this.inputs = plugin['ports']['audio']['input'].map(input => new Lv2Input(this, input))
    this.outputs = plugin['ports']['audio']['output'].map(output => new Lv2Output(this, output))
  }

  json() {
    return {
      'technology': 'lv2',
      'plugin': this.plugin['uri'],
      'active': this.active,
      'params': this.params.map(param => param.json),
    }
  }
}
