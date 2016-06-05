import {IONIC_DIRECTIVES} from 'ionic-angular';
import {Component} from '@angular/core';

@Component({
  selector: 'sr-combobox',
  templateUrl: 'build/components/sr-combobox/sr-combobox.html',
  directives: [IONIC_DIRECTIVES]
})
export class SrCombobox {
  public selected : string;
  public parameter : Object;

  constructor() {
    this.selected = '1x15';
    this.parameter = {
      name: 'Combo',
      options: [
        { value: '4x12', name: '4x12' },
        { value: '2x10', name: '2x10' },
        { value: '1x15', name: '1x15' },
        { value: '4x8', name: '4x8' }
      ]
    };
  }

  public before() {
    let index = this.indexOf(this.selected) - 1;
    if (index == -1)
      index = this.parameter["options"].length - 1;

    this.selected = this.parameter["options"][index].value;
  }

  public next() {
    let index = this.indexOf(this.selected) + 1;
    if (index == this.parameter["options"].length)
      index = 0;

    this.selected = this.parameter["options"][index].value;
  }

  private indexOf(value : string) : number {
    let index = 0;
    for (let option of this.parameter["options"]) {
      if (option["value"] == value)
        return index;
      index++;
    }

    return -1;
  }
}
