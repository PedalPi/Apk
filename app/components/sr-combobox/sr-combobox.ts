import {IONIC_DIRECTIVES} from 'ionic-angular';
import {Input, Output, EventEmitter, Component} from '@angular/core';

@Component({
  selector: 'sr-combobox',
  templateUrl: 'build/components/sr-combobox/sr-combobox.html',
  directives: [IONIC_DIRECTIVES]
})
export class SrCombobox {
  @Input() parameter : any;
  @Input() selected : any;
  @Output('onChange') onChange = new EventEmitter();

  constructor() {
    this.parameter = {
      name: 'Combo',
      scalePoints: [
        { value: '4x12', label: '4x12' },
        { value: '2x10', label: '2x10' },
        { value: '1x15', label: '1x15' },
        { value: '4x8', label: '4x8' }
      ]
    };
    this.selected = '1x15';
  }

  public get options() {
    return {
      title: this.parameter.name,
    };
  }

  public before() {
    let index = this.indexOf(this.selected) - 1;
    if (index == -1)
      index = this.parameter.scalePoints.length - 1;

    this.selected = this.parameter.scalePoints[index].value;
    this.update();
  }

  public next() {
    let index = this.indexOf(this.selected) + 1;
    if (index == this.parameter.scalePoints.length)
      index = 0;

    this.selected = this.parameter.scalePoints[index].value;
    this.update();
  }

  private indexOf(value : string) : number {
    let index = 0;
    for (let option of this.parameter.scalePoints) {
      if (option["value"] == value)
        return index;
      index++;
    }

    return -1;
  }

  update() {
    this.parameter.value = this.selected;
    this.onChange.emit(this.parameter);
  }
}
