import {JsonService} from '../../providers/json/json-service';
import {PluginService} from '../../providers/json/plugin-service';

import {PluginsCategories} from './plugins-categories';


export class PluginsPresenter {

  private jsonService : JsonService;
  public effects : any = [];
  public effectsByCategory : any = {};

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
        this.effects = data.plugins.sort((a, b) => a.name.localeCompare(b.name));
        this.effectsByCategory = this.separatePluginsByCategory(this.effects);
      }
    );
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
