import {Input, Component} from '@angular/core';

@Component({
  selector: 'sr-icon',
  templateUrl: 'sr-icon.html',
  styles: [`
    .icon {
    	display: inline-block;
    	width: inherit;
    	height: inherit;
    	fill: currentColor;
    }
  `],
})
export class SrIcon {
  @Input() icon : string;

  get url() {
    return "assets/img/" + this.icon;
  }
}
