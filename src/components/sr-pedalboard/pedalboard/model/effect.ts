import {Input, Output} from './plug';

import {Effect as EffectModel} from '../../../../plugins-manager/model/effect'

import {ElementDrawer} from './element-drawer';


export class Effect implements ElementDrawer {
  static get className() { return "Effect"; }
  get className() { return Effect.className; }

  public id : number;

  public identifier : EffectModel;
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

  constructor(x, y, identifier : EffectModel, data) {
    this.identifier = identifier;
    this.data = data;

    this.x = x;
    this.y = y;

    for (let i=0; i<this.dataInputs.length; i++) {
      let input = this.dataInputs[i];
      let identifier = this.identifier.inputs[i];

      this.objectInputs.push(new Input(this, identifier, input));
    }

    for (let i=0; i<this.dataOutputs.length; i++) {
      let output = this.dataOutputs[i];
      let identifier = this.identifier.outputs[i];

      this.objectOutputs.push(new Output(this, identifier, output));
    }
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

  get model() {
    return this.identifier;
  }
}
