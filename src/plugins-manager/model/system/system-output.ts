import {Output} from '../output';


export class SystemOutput extends Output {

  constructor(effect, private output) {
    super(effect)
  }

  get symbol(this) {
    return this.output
  }

  json() {
    return {
      'symbol': this.symbol,
      'index': this.effect.outputs.indexOf(this),
    }
  }
}
