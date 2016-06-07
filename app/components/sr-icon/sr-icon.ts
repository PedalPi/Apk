import {Input, Component} from '@angular/core';

@Component({
  selector: 'sr-icon',
  templateUrl: 'build/components/sr-icon/sr-icon.html',
  styles: [`
  .icon {
  	display: inline-block;
  	width: inherit;
  	height: inherit;
  	fill: currentColor;
  }
`]
})
export class SrIcon {
  @Input() icon : string;

  get url() {
    return "img/" + this.icon;
  }
}
