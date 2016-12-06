import * as d3 from 'd3';

import {SystemPort} from './port';

export interface Effect {
  id : number;
  data : any;
  inputs : Array<any>;
  outputs : Array<any>;
}

export class Lv2Effect implements Effect {
  public id : number;
  private x : number;
  private y : number;

  public data : any;
  private title : string;

  public view;

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

  get inputs() {
    return this.data.ports.audio.input;
  }

  get outputs() {
    return this.data.ports.audio.output;
  }

  static effectOfPort(portElement) {
    return d3.select(portElement.node().parentElement.parentElement).data()[0];
  }
}

export class SystemEffect implements Effect {
  public id : number;
  public inputs : Array<SystemPort>;
  public outputs : Array<SystemPort>;

  public x = 0;
  public y = 0;

  constructor(inputs : string[], outputs: string[]) {
    this.id = 0;
    this.inputs = inputs.map(input => new SystemPort(input, 'system-input'));
    this.outputs = outputs.map(output => new SystemPort(output, 'system-output'));
  }

  get data() {
    return {
      inputs: this.inputs,
      outputs: this.outputs
    };
  }
}
