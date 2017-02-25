import {Input, Output, EventEmitter, Component} from '@angular/core';

@Component({
  selector: 'sr-toggle',
  templateUrl: 'sr-toggle.html',
})
export class SrToggle {
  @Input() parameter : any;
  @Output('onChange') onChange = new EventEmitter();

  constructor() {
    this.parameter = {
      value : 0
    };
  }

  get name() : string {
    return this.parameter.data.name.toLowerCase();
  }

  get actived() : boolean {
    return this.parameter.value === 1
  }

  update() {
    this.parameter.value = this.actived ? 0 : 1;
    this.onChange.emit(this.parameter);
  }
}
