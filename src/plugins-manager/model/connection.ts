import {Output} from './output';
import {Input} from './input';


export class Connection {
  constructor(public output: Output, public input: Input) {}

  equals(this, other: Connection) {
    return this.input == other.input
        && this.output == other.output
  }

  json() {
    return {
      'output': this.output.json,
      'input': this.input.json,
    }
  }
}
