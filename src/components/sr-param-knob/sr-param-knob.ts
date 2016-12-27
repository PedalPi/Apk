import {
  Input, Output,
  Component,
  EventEmitter
} from '@angular/core';

import {Lv2Param} from '../../plugins-manager/model/lv2/lv2-param';


@Component({
  selector: 'sr-param-knob',
  templateUrl: 'sr-param-knob.html',
})
export class SrParamKnob {
  @Input() parameter : Lv2Param;
  @Output('onChange') onChange = new EventEmitter();

  get name() : string {
    return this.parameter.data.name.toLowerCase();
  }

  get valueRepresentation() : string {
    return this.render(this.parameter.value);
  }

  get minimumRepresentation() : string {
    return this.truncate(this.parameter.minimum, 2) + "";
  }

  get maximumRepretation() : string {
    return this.render(this.parameter.maximum);
  }

  private render(value) : string {
    value = this.truncate(value, 2);

    if (!this.parameter.data.units.hasOwnProperty('render'))
      return value + "";

    let render = this.parameter.data.units.render;

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
