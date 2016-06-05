import {Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';

import { SrTab } from './sr-tab';

@Component({
  selector: 'sr-tabs',
  template:`
    <ul class="nav nav-tabs">
      <li *ngFor="let tab of tabs" (click)="selectTab(tab)" [class.active]="tab.active">
        <button clear>{{tab.title}}</button>
      </li>
    </ul>
    <ng-content></ng-content>
  `
})
export class SrTabs implements AfterContentInit {
  @ContentChildren(SrTab) tabs: QueryList<SrTab>;

  ngAfterContentInit() {
    if (this.tabs.length == 0)
      return;

    let activeTabs = this.tabs.filter(tab => tab.active);

    const tab = activeTabs.length === 0 ? this.tabs.first : activeTabs[0];
    this.selectTab(tab);
  }

  selectTab(tab : SrTab) {
    this.tabs.toArray().forEach(tab => tab.active = false);
    tab.active = true;
  }
}
