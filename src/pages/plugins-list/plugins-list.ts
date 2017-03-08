import {Input, Output, EventEmitter, Component, ElementRef} from '@angular/core';

import {Lv2Effect} from '../../plugins-manager/model/lv2/lv2-effect';

import {Fragment} from '../../common/fragment/fragment';
import {FragmentNavigator} from '../../common/fragment/fragment-navigator';


@Component({
  selector: 'page-plugins-list',
  templateUrl: 'plugins-list.html',
})
export class PluginsListPage implements Fragment {
  @Input() fragmentNavigator : FragmentNavigator;
  @Output() onPluginSelected = new EventEmitter();

  public category : string;
  public plugins : any = [];
  private pluginsOriginals : any = [];

  constructor(private element : ElementRef) {}

  ionViewWillEnter() {
    this.category = this.fragmentNavigator.params['category'];
    this.pluginsOriginals = this.fragmentNavigator.params['plugins'];
    this.plugins = this.initializeItems();
  }

  public close() {
    this.fragmentNavigator.pop();
  }

  public itemSelected(plugin) {
    let effect = new Lv2Effect(plugin);
    this.onPluginSelected.emit(effect);
  }

  public getItems(event: any) {
    this.plugins = this.initializeItems();
    let name = event.target.value;

    if (name && name.trim() != '')
      this.plugins = this.plugins.filter((plugin) =>
        (plugin.name.toLowerCase().indexOf(name.toLowerCase()) > -1)
      );
  }

  private initializeItems() {
    return this.pluginsOriginals.slice(0);
  }

  public getNativeElement() {
    return this.element.nativeElement;
  }
}
