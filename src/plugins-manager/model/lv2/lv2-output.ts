import {Output} from '../output';

export class Lv2Output extends Output {
  constructor(effect, private output : any) {
    super(effect)
  }

  get symbol(this) {
    return this.output['symbol']
  }

  json() {
    const dictionary = super.json()
    dictionary['index'] = this.output['index']

    return dictionary
  }
}
