import {Behavior} from './behavior';
import {SrKnob} from './sr-knob';


export class CircularBehavior implements Behavior {
  private clickedMouseAngle : number;
  private lap : number = 0;
  private lastMouseAngle : number = 0;

  constructor(private knob : SrKnob) {
    knob.addEvent(
      knob.image,
      'mousedown',
      (event) => {
        this.clickedMouseAngle = this.mouseAngle(event);
        this.lap = 0;
      }
    );
  }

  calculateAngle(event) : number {
    const initialAngle = this.knob.angleByValue(this.knob.clickedValue);
    const mouseAngle = this.mouseAngle(event);

    const HIGH_CHANGE = 200; // deg
    if ((this.lastMouseAngle - mouseAngle) > HIGH_CHANGE && this.lap < 1)
      this.lap += 1;

    else if ((this.lastMouseAngle - mouseAngle) < -HIGH_CHANGE && this.lap > -1)
      this.lap -= 1;

    const changeAngle = mouseAngle - this.clickedMouseAngle;

    this.lastMouseAngle = mouseAngle;

    let angle = initialAngle + changeAngle + 360*this.lap
    return angle < 0 ? angle + 360 : angle;
  }

  mouseAngle(event) {
    const element = this.knob.image;

    const offset = element.getBoundingClientRect();

    const centerX = (offset.left + offset.right) / 2;
    const centerY = (offset.top + offset.bottom) / 2;

    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;

    const angle = (Math.atan2(deltaY, deltaX) * 180 / Math.PI);

    return angle < 0 ? 360 + angle : angle;
  }
}
