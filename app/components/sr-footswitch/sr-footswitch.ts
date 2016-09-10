import {IONIC_DIRECTIVES} from 'ionic-angular';
import {
  ElementRef,
  Input,
  Output,
  Component,
  EventEmitter,
  forwardRef
} from '@angular/core';

import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SrFootswitch),
    multi: true
};

@Component({
  selector: 'sr-footswitch',
  templateUrl: 'build/components/sr-footswitch/sr-footswitch.html',
  directives: [IONIC_DIRECTIVES],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class SrFootswitch implements ControlValueAccessor {
  @Input() status : boolean;
  @Output('onChange') onChange = new EventEmitter();
  private element: any;

  private onChangeCallback = () => {};
  private onTouchedCallback = () => {};

  constructor(element : ElementRef) {
    this.element = element.nativeElement;
    this.status = false;
  }

  public onClick() {
    this.status = !this.status;
    this.onChange.emit(this.status);
  }

  writeValue(value: any) {
    if (value === null || value === undefined)
      return;

    this.status = value;
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
}
