import {Effect} from './effect'


export class Plug {
  public data : any;
  public effect : Effect;
  public view;

  constructor(effect : Effect, data) {
    this.effect = effect;
    this.data = data;
  }

  public get position() {
    return {
      x: this.effect.x + parseInt(this.view.attr("cx")),
      y: this.effect.y + parseInt(this.view.attr("cy")),
    }
  }
}

export class Input extends Plug {}

export class Output extends Plug {
  onConnectedListener = (output : Output, input : Input) => {}
}
