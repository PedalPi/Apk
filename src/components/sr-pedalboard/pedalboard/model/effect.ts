import * as d3 from 'd3';

import {EdgeConnector} from '../edge-connector';


export class Effect {
  public id : number;
  private x : number;
  private y : number;

  public data : any;
  private title : string;

  constructor(x, y, data) {
    this.id = -1;
    this.x = x;
    this.y = y;

    this.data = data;
    this.title = data.name;
  }

  dragmove(event) {
    this.x += event.dx;
    this.y += event.dy;
  }

  get input() {
    return this.data.ports.audio.input;
  }

  get output() {
    return this.data.ports.audio.output;
  }

  static effectOfPort(portElement) {
    return d3.select(portElement.node().parentElement.parentElement).data()[0];
  }
}
