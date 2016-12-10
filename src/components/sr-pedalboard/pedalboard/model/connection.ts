import {Output, Input} from './plug';


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
}
