import {Param} from '../param'
import {Lv2Effect} from './lv2-effect'


export class Lv2Param extends Param {

  constructor(effect : Lv2Effect, private param: any) {
    super(effect, param['ranges']['default'])
  }

  get maximum() {
    return this.param['ranges']['maximum']
  }

  get minimum() {
    return this.param['ranges']['minimum']
  }

  get symbol() {
    return this.param['symbol']
  }

  json() {
    const dictionary = super.json()
    dictionary['index'] = this.param['index']

    return dictionary
  }
}
