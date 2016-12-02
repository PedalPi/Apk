import { Component, Input } from '@angular/core';

@Component({
  selector: 'sr-tab',
  template: `
    <div [hidden]="!active">
      <ng-content></ng-content>
    </div>
  `
})
export class SrTab {
  @Input() title: string;
  @Input() active = false;
}
