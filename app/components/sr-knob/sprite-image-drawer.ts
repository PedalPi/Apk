import {ImageDrawer} from './image-drawer';
import {SrKnob} from './sr-knob';


export class SpriteImageDrawer implements ImageDrawer {
  constructor(private knob : SrKnob) {
    this.knob.image.style.background = `url(${this.knob.sprite}) 0 0`;
    this.knob.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
  }

  public updateImage(angle : number) {
    const sprite = Math.trunc(angle*this.knob.spritesTotal/360);
    const spritePercent = sprite*100/this.knob.spritesTotal
    console.log(spritePercent)
    //360   = totalSprites = 100
    //angle =      sprite       =  y

    this.knob.image.style.backgroundPositionX = `${spritePercent}%`;
  }
}
