import {Effect} from './effect'


export abstract class Param {
  public value : number

  constructor(public effect: Effect, public defaultValue: number) {
    this.value = defaultValue
  }

  get relativeIndex() : number {
    return this.effect.params.indexOf(this)
  }

  abstract get minimum() : number
  abstract get maximum() : number
  abstract get symbol() : string

  json() {
    return {
      'index': this.relativeIndex,
      'minimum': this.minimum,
      'maximum': this.maximum,
      'symbol': this.symbol,
      'value': this.value,
    }
  }
}
