import {JsonService} from '../../providers/json/json-service';
import {PluginService} from '../../providers/json/plugin-service';

import {PluginsCategories} from './plugins-categories';


export class PluginsPresenter {

  private jsonService : JsonService;
  public plugins : any = [];
  public pluginsByCategory : any = {};

  public categories = new PluginsCategories();

  constructor(jsonService : JsonService) {
    this.jsonService = jsonService;
  }

  private get service() : PluginService {
    return this.jsonService.plugin;
  }

  load() {
    //https://github.com/mozilla/localForage
    this.service.getPlugins().subscribe(
      data => {
        this.plugins = data.plugins.sort((a, b) => a.name.localeCompare(b.name));
        this.pluginsByCategory = this.separatePluginsByCategory(this.plugins);
      }
    );
  }

  private sort(list) {
    return list;
  }

  private separatePluginsByCategory(plugins : any[]) : any {
    let effectsByCategory = {};

    for (let plugin of plugins) {
      for (let category of plugin.category) {
        if (effectsByCategory[category] === undefined)
          effectsByCategory[category] = []

        effectsByCategory[category].push(plugin);
      }
    }

    return effectsByCategory;
  }
}
