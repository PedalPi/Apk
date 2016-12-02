import {Input, Output, Component, EventEmitter} from '@angular/core';


@Component({
  selector: 'sr-slider',
  templateUrl: 'sr-slider.html',
})
export class SrSlider {
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

  get value() {
    return this.render(this.parameter.value);
  }

  get minimum() {
    return this.truncate(this.parameter.ranges.minimum, 2);
  }

  get maximum() {
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

  public update() {
    this.onChange.emit(this.parameter);
  }
}
