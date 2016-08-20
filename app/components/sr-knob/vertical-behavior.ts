import {Behavior} from './behavior';
import {SrKnob} from './sr-knob';


export class VerticalBehavior implements Behavior {
  private pixelsRange : number = 75;
  constructor(private knob : SrKnob) {}

  public calculateAngle(event) : number {
    const decaimento = this.calculateDecaimento(this.knob.clickedValue)

    let change = event.clientY - this.knob.clickedPosition - decaimento;

    if (change > this.pixelsRange)
      change = this.pixelsRange;

    else if (change < -this.pixelsRange)
      change = -this.pixelsRange;

    change += this.pixelsRange;
    change = 2*this.pixelsRange - change;

    return 360*change/(2*this.pixelsRange);
  }

  private calculateDecaimento(angle) {
    const decaimento = (2*this.pixelsRange)*angle/360.0;

    return decaimento - this.pixelsRange;
  }
}
