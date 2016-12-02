import {ImageDrawer} from './image-drawer';
import {SrKnob} from './sr-knob';


export class SrcImageDrawer implements ImageDrawer {
  private gap : number = 30; // deg
  private startAngle : number = 180 - this.gap/2;

  constructor(private knob : SrKnob) {}

  public updateImage(angle) {
    let visibleAngle = (360-this.gap)*angle / 360;
    visibleAngle -= this.startAngle;

    this.knob.image.style.transform = `rotate(${visibleAngle}deg)`;
  }
}
