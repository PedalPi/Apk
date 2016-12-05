import {Effect} from './effect';

export class Port {

  private effect : Effect;
  private name : string;
  private type;

  constructor(effect : Effect, data, type) {
    this.effect = effect;
    this.name = data.name;
    this.type = type;
  }
}
