import {IONIC_DIRECTIVES} from 'ionic-angular';
import {Input, Output, Component, EventEmitter} from '@angular/core';

declare var sprintf: any;

@Component({
  selector: 'sr-slider',
  templateUrl: 'build/components/sr-slider/sr-slider.html',
  directives: [IONIC_DIRECTIVES]
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
    if (this.parameter.units.hasOwnProperty('render'))
      return this.concatUnit(this.parameter.value);

    return this.parameter.value;
  }

  get maximum() {
    if (this.parameter.units.hasOwnProperty('render'))
      return this.concatUnit(this.parameter.ranges.maximum);

    return this.parameter.ranges.maximum;
  }

  private concatUnit(value) {
    return sprintf(this.parameter.units.render, value);
  }

  public update() {
    this.onChange.emit(this.parameter);
  }
}
