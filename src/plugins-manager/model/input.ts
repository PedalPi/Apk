export abstract class Input {
  public symbol : string
  constructor(public effect) {}

  json() {
    return {
      'effect': this.effect.pedalboard.effects.indexOf(this.effect),
      'symbol': this.symbol,
      'index': this.effect.inputs.indexOf(this),
    }
  }
}
