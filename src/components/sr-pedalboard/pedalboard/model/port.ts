import {Effect} from './effect';

export class Port {
  protected name : string;
  protected type;
  public data;

  constructor(data, type) {
    this.data = data;
    this.name = data.name;
    this.type = type;
  }
}

export class SystemPort extends Port {

}


export class EffectPort extends Port {
  private effect : Effect;

  constructor(effect : Effect, data, type) {
    super(data, type);
    this.effect = effect;
  }
}
