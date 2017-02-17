import {Effect} from './effect'

import {Port} from '../../../../plugins-manager/model/port'

export class Plug {
  public data : any;
  public effect : Effect;
  public view;
  public identifier : Port;

  constructor(effect : Effect, identifier : Port, data : any) {
    this.effect = effect;
    this.data = data;
    this.identifier = identifier;
  }

  public get position() {
    return {
      x: this.effect.x + parseInt(this.view.attr("cx")),
      y: this.effect.y + parseInt(this.view.attr("cy")),
    }
  }

  get model() {
    return this.identifier;
  }
}

export class Input extends Plug {}

export class Output extends Plug {
  onConnectedListener = (output : Output, input : Input) => {}
}
