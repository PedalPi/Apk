import {Behavior} from './behavior';
import {SrKnob} from './sr-knob';

export class CircularBehavior implements Behavior {
  private static HIGH_CHANGE = 200; // deg
  private clickedMouseAngle : number;
  private initialAngle : number;
  private lap : number = 0;
  private lastMouseAngle : number = null;

  constructor(private knob : SrKnob) {
    const event = (event) => {
      this.clickedMouseAngle = this.pointerAngle(event);
      this.initialAngle = this.knob.angleByValue(this.knob.clickedValue);

      if (this.lastMouseAngle == null)
        this.lastMouseAngle = this.clickedMouseAngle;

      this.lap = 0;
    };

    knob.addEvent(knob.image, 'mousedown', event);
    knob.addEvent(knob.image, 'touchstart', event);
  }

  calculateAngle(event) : number {
    const currentPointerAngle = this.pointerAngle(event)
    const changeAngle = currentPointerAngle - this.clickedMouseAngle;

    if (this.CLOCKWISE_LIMIT(currentPointerAngle) && this.lap < 1)
      this.lap += 1;
    else if (this.ANTI_CLOCKWISE_LIMIT(currentPointerAngle) && this.lap > -1)
      this.lap -= 1;

    this.lastMouseAngle = currentPointerAngle;

    return this.initialAngle + changeAngle + this.lap*360;
  }

  CLOCKWISE_LIMIT(currentPointerAngle) {
    return (this.lastMouseAngle - currentPointerAngle) > CircularBehavior.HIGH_CHANGE;
  }

  ANTI_CLOCKWISE_LIMIT(currentPointerAngle) {
    return (this.lastMouseAngle - currentPointerAngle) < -CircularBehavior.HIGH_CHANGE;
  }

  prepare(num) {
     return Math.round(num * 100) / 100
  }

  pointerAngle(event) {
    const isMouse = event.clientX !== undefined;
    const eventClientPosition = isMouse ?
      this.mouseClientPosition(event)
    : this.touchClientPosition(event);

    const element = this.knob.image;

    const offset = element.getBoundingClientRect();

    const centerX = (offset.left + offset.right) / 2;
    const centerY = (offset.top + offset.bottom) / 2;

    const deltaX = eventClientPosition.x - centerX;
    const deltaY = eventClientPosition.y - centerY;

    let angle = (Math.atan2(deltaY, deltaX) * 180 / Math.PI);
    angle += 270;

    return angle > 360 ? angle - 360 : angle;
  }

  mouseClientPosition(event) {
    return {
      x: event.clientX,
      y: event.clientY
    };
  }

  touchClientPosition(event) {
    return {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY
    };
  }
}
