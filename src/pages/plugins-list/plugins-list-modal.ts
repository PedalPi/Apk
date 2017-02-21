import {Component} from '@angular/core';
import {ViewController, NavController, NavParams} from 'ionic-angular';
import {Lv2Effect} from '../../plugins-manager/model/lv2/lv2-effect';


@Component({
  templateUrl: 'plugins-list-modal.html',
})
export class PluginsListModal {
  public category : string;
  public plugins : any = [];
  private pluginsOriginals : any = [];

  constructor(private nav : NavController, params : NavParams, private controller: ViewController) {
    this.category = params.get('category');
    this.pluginsOriginals = params.get('plugins');
    this.plugins = this.initializeItems();
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
}
