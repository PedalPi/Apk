import {Output, Input} from './plug';

import {Connection as ConnectionModel} from '../../../../plugins-manager/model/connection'


export class Connection {
  public index : number;

  private outputObject;
  private inputObject;

  public view = null;

  public onSelectedListener = (connection : Connection) => {};

  constructor(output : Output, input : Input) {
    this.outputObject = output;
    this.inputObject = input;
  }

  get output() {
    return this.outputObject;
  }

  get input() {
    return this.inputObject;
  }

  get model() {
    return new ConnectionModel(this.output.model, this.input.model);
  }
}
