import {ImageDrawer} from './image-drawer';
import {SrKnob} from './sr-knob';


export class SpriteImageDrawer implements ImageDrawer {
  constructor(private knob : SrKnob) {
    this.knob.image.style.background = `url(${this.knob.sprite}) 0 0`;
  }

  public updateImage(angle : number) {
    const sprite = Math.trunc(angle*this.knob.spritesTotal/360);

    this.knob.image.style.backgroundPositionX = `-${sprite*this.knob.spriteSize}px`;
  }
}
