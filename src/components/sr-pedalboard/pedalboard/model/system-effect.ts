import {Effect} from './effect';


export class SystemEffect extends Effect {

  constructor(data) {
    super(0, 0, data);
  }

  protected get dataInputs() {
    return this.data.inputs;
  }

  protected get dataOutputs() {
    return this.data.outputs;
  }
}
