import {Component, ViewChild} from '@angular/core';
import {ViewController, NavController, NavParams} from 'ionic-angular';
import {EffectReader} from '../../plugins-manager/decoder/persistence-decoder';
import {SrTabs} from '../../components/sr-tabs/sr-tabs';

import {JsonService} from '../../providers/json/json-service';


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
    //console.log(plugin);
    //let effect = new EffectReader(null).read({technology: 'lv2', pluginData : plugin});
    let effect = plugin;
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
    return this.pluginsOriginals.slice(0).reverse();
  }
}
