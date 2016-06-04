import {Component} from '@angular/core';

@Component({
  selector: 'sr-slider',
  inputs: ['parameter'],
  templateUrl: 'build/components/sr-slider/sr-slider.html'
})
export class SrSlider {
  constructor() {
    this.parameter = {
      name: 'Name',
      min: 0,
      max: 0,
      current: 0
    };
  }
}
