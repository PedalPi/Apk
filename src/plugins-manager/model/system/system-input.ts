import {Input} from '../input';


export class SystemInput extends Input {

  constructor(effect, private input : any) {
    super(effect)
  }

  get symbol() {
    return this.input
  }

  json() : any {
    return {
      'symbol': this.symbol,
      'index': this.effect.inputs.indexOf(this),
    }
  }
}
