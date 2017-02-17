import {Effect} from './effect'

export abstract class Port {
  public symbol: string

  constructor(public effect: Effect) {}

  abstract json();
}
