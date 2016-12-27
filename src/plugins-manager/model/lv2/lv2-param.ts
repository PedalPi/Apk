import {Param} from '../param'
import {Lv2Effect} from './lv2-effect'


export class Lv2Param extends Param {
  constructor(effect : Lv2Effect, private param: any) {
    super(effect, param['ranges']['default'])
  }

  get data() {
    return this.param
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

  parameterType() {
    if (this.isKnob())
      return "knob";
    else if (this.isCombobox())
      return "combobox";
    else
      return "toggle";
  }

  isKnob() : boolean {
    return this.data.properties.indexOf('enumeration') == -1
        && this.data.properties.indexOf('toggled') == -1
  }

  isCombobox() : boolean {
    return this.data.properties.indexOf('enumeration') != -1;
  }

  isToggle() : boolean {
    return this.data.properties.indexOf('toggled') != -1
  }
}
