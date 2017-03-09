import {Effect} from './effect';
import {SystemEffect as SystemEffectModel} from '../../../../plugins-manager/model/system/system-effect';

export class SystemEffect extends Effect {

  constructor(identifier : SystemEffectModel, data) {
    super(0, 0, identifier, data);
  }

  protected get dataInputs() {
    return this.data.inputs;
  }

  protected get dataOutputs() {
    return this.data.outputs;
  }
}
