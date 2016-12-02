import {Behavior} from './behavior';
import {SrKnob} from './sr-knob';


export class CircularBehavior implements Behavior {
  private clickedMouseAngle : number;
  private lap : number = 0;
  private lastMouseAngle : number = 0;

  constructor(private knob : SrKnob) {
    const event = (event) => {
      this.clickedMouseAngle = this.pointerAngle(event);
      this.lap = 0;
    };

    knob.addEvent(knob.image, 'mousedown', event);
    knob.addEvent(knob.image, 'touchstart', event);
  }

  calculateAngle(event) : number {
    const initialAngle = this.knob.angleByValue(this.knob.clickedValue);
    const pointerAngle = this.pointerAngle(event);

    const HIGH_CHANGE = 200; // deg
    if ((this.lastMouseAngle - pointerAngle) > HIGH_CHANGE && this.lap < 1)
      this.lap += 1;

    else if ((this.lastMouseAngle - pointerAngle) < -HIGH_CHANGE && this.lap > -1)
      this.lap -= 1;

    const changeAngle = pointerAngle - this.clickedMouseAngle;

    this.lastMouseAngle = pointerAngle;

    let angle = initialAngle + changeAngle + 360*this.lap
    return angle < 0 ? angle + 360 : angle;
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

    const angle = (Math.atan2(deltaY, deltaX) * 180 / Math.PI);

    return angle < 0 ? 360 + angle : angle;
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
