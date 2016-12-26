import {Input, Output} from './plug';


export class Effect {
  public id : number;

  public identifier : any;
  public data : any;

  public x : number;
  public y : number;
  public view;

  public onSelectedListener = (effect : Effect) => {};
  public onSelectedDoubleClickListener = (effect : Effect) => {};
  public onDragListener = (effect : Effect) => {};
  public onDragEndListener = (effect : Effect) => {};

  private objectInputs = [];
  private objectOutputs = [];

  constructor(x, y, data, identifier?) {
    this.identifier = identifier;
    this.data = data;

    this.x = x;
    this.y = y;

    for (let input of this.dataInputs)
      this.objectInputs.push(new Input(this, input));

    for (let output of this.dataOutputs)
      this.objectOutputs.push(new Output(this, output));
  }

  protected get dataInputs() {
    return this.data.ports.audio.input;
  }

  protected get dataOutputs() {
    return this.data.ports.audio.output;
  }

  get inputs() {
    return this.objectInputs;
  }

  get outputs() {
    return this.objectOutputs;
  }
}
