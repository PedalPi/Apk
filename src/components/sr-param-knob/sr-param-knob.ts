import {
  Input, Output,
  Component,
  EventEmitter
} from '@angular/core';


@Component({
  selector: 'sr-param-knob',
  templateUrl: 'sr-param-knob.html',
})
export class SrParamKnob {
  @Input() parameter : any;
  @Output('onChange') onChange = new EventEmitter();

  constructor() {
    this.parameter = {
      name: 'Name',
      value: 0,
      ranges: {
        minimum: 0,
        maximum: 0,
        default: 0
      },
      units: {}
    };
  }

  get name() : string {
    return this.parameter.name.toLowerCase();
  }

  get value() : string {
    return this.render(this.parameter.value);
  }

  get minimum() : string {
    return this.truncate(this.parameter.ranges.minimum, 2) + "";
  }

  get maximum() : string {
    return this.render(this.parameter.ranges.maximum);
  }

  private render(value) : string {
    value = this.truncate(value, 2);

    if (!this.parameter.units.hasOwnProperty('render'))
      return value + "";

    let render = this.parameter.units.render;

    return sprintf(render, value);
  }

  private truncate(num, places) {
    return Math.trunc(num * Math.pow(10, places)) / Math.pow(10, places);
  }

  public update(value) {
    this.parameter.value = value;
    this.onChange.emit(this.parameter);
  }
}
