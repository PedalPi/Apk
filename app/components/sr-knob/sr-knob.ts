import {IONIC_DIRECTIVES} from 'ionic-angular';
import {
  ElementRef,
  Input,
  Output,
  Component,
  EventEmitter,
  ContentChild,
  forwardRef
} from '@angular/core';

import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

import {Behavior} from './behavior';
import {CircularBehavior} from './circular-behavior';
import {VerticalBehavior} from './vertical-behavior';

import {ImageDrawer} from './image-drawer';
import {SrcImageDrawer} from './src-image-drawer';
import {SpriteImageDrawer} from './sprite-image-drawer';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SrKnob),
    multi: true
};

@Component({
  selector: 'sr-knob',
  templateUrl: 'build/components/sr-knob/sr-knob.html',
  directives: [IONIC_DIRECTIVES],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class SrKnob implements ControlValueAccessor {
  @Input() value : number;
  @Input() min : number;
  @Input() max : number;

  @Input() src : string;

  // Sprite drawer
  @Input() sprite : string;
  @Input() spritesTotal : number;

  @Output('onChange') onChange = new EventEmitter();

  public element : any;
  public image : any;

  public clickedPosition : number = 0;
  public clickedValue : number = 0;

  private functions : any;

  private behavior : Behavior = null;
  private imageDrawer : ImageDrawer = null;

  private onChangeCallback = () => {};
  private onTouchedCallback = () => {};

  constructor(element: ElementRef) {
    this.element = element.nativeElement;

    this.clickedPosition = 0;

    this.functions = {
      'rotate': (event) => this.rotate(event),
      'pressed': (event) => this.pressed(event),
      'drop': () => this.drop()
    };
  }

  ngOnInit() {
    this.image = this.element.querySelector('img');

    this.clickedValue = this.value;
    this.addEvent(this.image, 'mousedown', this.functions.pressed);

    //this.behavior = new VerticalBehavior(this);
    this.behavior = new CircularBehavior(this);

    if (this.src == undefined)
      this.imageDrawer = new SpriteImageDrawer(this);
    else
      this.imageDrawer = new SrcImageDrawer(this);

    this.imageDrawer.updateImage(this.angleByValue(this.value));
  }

  addEvent(element : any, event : string, callback : EventListener) {
    element.addEventListener(event, callback, false);
  }

  private removeEvent(element : any, event : string, callback : EventListener) {
    element.removeEventListener(event, callback, false);
  }

  private pressed(event) {
    this.clickedPosition = event.clientY;
    this.clickedValue = this.value;

    this.addEvent(document, 'mousemove', this.functions.rotate);
    this.addEvent(document, 'mouseup', this.functions.drop);
  }

  private rotate(event) {
    this.update(this.behavior.calculateAngle(event));
  }

  private drop() {
    this.removeEvent(document, 'mousemove', this.functions.rotate);
    this.removeEvent(document, 'mouseup', this.functions.drop);
  }

  public angleByValue(value) : number {
    return value * 360 / (this.max - this.min);
  }

  public valueByAngle(angle) : number {
    return (angle * (this.max - this.min)/360) + this.min;
  }

  private update(angle : number) {
    if (angle > 360)
      angle = 360;
    else if (angle < 0)
      angle = 0;

    const newValue = this.valueByAngle(angle);

    if (this.value == newValue)
      return;

    this.value = newValue;
    this.imageDrawer.updateImage(angle);
    this.onChange.emit(this.value);
  }

  public updateView() {
    this.imageDrawer.updateImage(this.angleByValue(this.value));
  }

  writeValue(value: any) {
    if (value === null || value === undefined)
      return;

    this.value = value;
    this.updateView();
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
}
