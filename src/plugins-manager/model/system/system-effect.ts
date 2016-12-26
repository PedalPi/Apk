import {Effect} from '../effect';
import {SystemInput} from './system-input';
import {SystemOutput} from './system-output';


export class SystemEffect extends Effect {
  constructor(public representation, outputs, inputs) {
    super()

    this.inputs = inputs.map(input => new SystemInput(this, input))
    this.outputs = outputs.map(output => new SystemOutput(this, output))
  }

  json() {
    return {
      'technology': 'system',
    }
  }
}
