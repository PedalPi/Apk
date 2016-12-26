import {Input} from '../input';


export class Lv2Input extends Input {

  constructor(effect, private input: any) {
    super(effect)
  }

  get symbol() {
    return this.input['symbol']
  }

  json() {
    const dictionary = super.json()
    dictionary['index'] = this.input['index']

    return dictionary
  }
}
