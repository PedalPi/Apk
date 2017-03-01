import { Input, Component } from '@angular/core';


@Component({
  selector: 'sr-button-toggle',
  templateUrl: 'sr-button-toggle.html'
})
export class SrButtonToggleComponent {
  @Input() state : boolean;

  constructor() {}
}
