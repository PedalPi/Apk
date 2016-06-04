import {Input, Component} from '@angular/core';

@Component({
  selector: 'sr-slider',
  templateUrl: 'build/components/sr-slider/sr-slider.html'
})
export class SrSlider {
  @Input() parameter : Object;

  constructor() {
    this.parameter = {
      name: 'Name',
      min: 0,
      max: 0,
      current: 0,
      unit: ''
    };
  }
}
