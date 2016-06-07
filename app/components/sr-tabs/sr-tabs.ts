import {Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';

import { SrTab } from './sr-tab';

@Component({
  selector: 'sr-tabs',
  templateUrl: 'build/components/sr-tabs/sr-tabs.html'
})
export class SrTabs implements AfterContentInit {
  @ContentChildren(SrTab) tabs: QueryList<SrTab>;
  private currentTab : SrTab;

  ngAfterContentInit() {
    this.currentTab = null;
    this.selectTab(0);

    console.log("Changed:", this.tabs.toArray());
  }

  selectTab(index) {
    if (index >= this.tabs.length || this.tabs.length == 0)
      return;

    if (this.currentTab)
      this.currentTab.active = false;

    this.currentTab = this.tabs.toArray()[index];
    this.currentTab.active = true;
  }
}
