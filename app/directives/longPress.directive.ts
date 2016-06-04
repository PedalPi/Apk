import {Gesture} from 'ionic-angular/gestures/gesture';
import {Input, Output, EventEmitter, Directive, ElementRef, OnInit, OnDestroy} from '@angular/core';

@Directive({
  selector: '[longPress]'
})
export class LongPressDirective implements OnInit, OnDestroy {
  element : ElementRef;
  pressGesture : Gesture;
  @Output('onLongPress') onLongPress = new EventEmitter();

  constructor(element : ElementRef) {
    this.element = element.nativeElement;
    this.pressGesture = null;
  }

  ngOnInit() {
    this.pressGesture = new Gesture(this.element);
    this.pressGesture.listen();
    this.pressGesture.on('press', e => this.onLongPress.emit({value: this.element}));
  }

  ngOnDestroy() {
    this.pressGesture.destroy();
  }
}
