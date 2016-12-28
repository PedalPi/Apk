import {
  ElementRef,
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  Output,
  EventEmitter
} from '@angular/core';

import { SrTab } from './sr-tab';

@Component({
  selector: 'sr-tabs',
  templateUrl: 'sr-tabs.html'
})
export class SrTabs implements AfterContentInit {
  private element : Element;
  private tabsHeader : Element;

  @ContentChildren(SrTab) tabs: QueryList<SrTab>;
  @Output('onSelect') onSelect = new EventEmitter();

  private currentTab : SrTab;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngAfterContentInit() {
    this.currentTab = null;
    this.selectTab(0);

    this.tabsHeader = this.element.querySelector("ul");
  }

  selectTabClick(index : number) {
    this.selectTab(index)
    this.onSelect.emit(index);
  }

  selectTab(index : number) {
    if (index >= this.tabs.length || this.tabs.length == 0)
      return;

    if (this.currentTab)
      this.currentTab.active = false;

    this.currentTab = this.tabs.toArray()[index];
    this.currentTab.active = true;
  }

  focusTab(index : number) {
    if (!this.tabsHeader)
      return;

    let tabsHeaderItems = this.tabsHeader.querySelectorAll("li");
    this.tabsHeader.scrollLeft = (<HTMLElement> tabsHeaderItems[index]).offsetLeft;
  }

  get current() {
    return this.tabs.toArray().indexOf(this.currentTab);
  }
}
