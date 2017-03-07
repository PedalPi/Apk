import {Component, ElementRef} from '@angular/core';
import {ViewController, NavController, NavParams} from 'ionic-angular';
import {Lv2Effect} from '../../plugins-manager/model/lv2/lv2-effect';

import {Fragment} from '../../common/fragment/fragment';


@Component({
  selector: 'page-plugins-list',
  templateUrl: 'plugins-list-modal.html',
})
export class PluginsListModal implements Fragment {
  public category : string;
  public plugins : any = [];
  private pluginsOriginals : any = [];

  constructor(
      private element : ElementRef,
      private nav : NavController,
      private params : NavParams,
      private controller: ViewController) {
    this.category = params.get('category');
    this.pluginsOriginals = [];//params.get('plugins');
    this.plugins = [];//this.initializeItems();
  }

  ionViewDidLoad() {
    this.category = this.params.get('category');
    this.pluginsOriginals = [];//params.get('plugins');
    this.plugins = [];//this.initializeItems();
  }

  close() {
    this.controller.dismiss();
  }

  itemSelected(plugin) {
    let effect = new Lv2Effect(plugin);
    this.controller.dismiss(effect);
  }

  getItems(event: any) {
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
