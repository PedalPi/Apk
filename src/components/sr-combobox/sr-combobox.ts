import {Input, Output, EventEmitter, Component} from '@angular/core';
import {Lv2Param} from '../../plugins-manager/model/lv2/lv2-param';


@Component({
  selector: 'sr-combobox',
  templateUrl: 'sr-combobox.html'
})
export class SrCombobox {
  @Input() parameter : Lv2Param;
  @Input() selected : any;
  @Output('onChange') onChange = new EventEmitter();

  get name() : string {
    return this.parameter.data.name.toLowerCase();
  }

  public get options() {
    return {
      title: this.parameter.data.name,
    };
  }

  public before() {
    let index = this.indexOf(this.selected) - 1;
    if (index == -1)
      index = this.parameter.data.scalePoints.length - 1;

    this.selected = this.parameter.data.scalePoints[index].value;
    this.update();
  }

  public next() {
    let index = this.indexOf(this.selected) + 1;
    if (index == this.parameter.data.scalePoints.length)
      index = 0;

    this.selected = this.parameter.data.scalePoints[index].value;
    this.update();
  }

  private indexOf(value : string) : number {
    let index = 0;
    for (let option of this.parameter.data.scalePoints) {
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
