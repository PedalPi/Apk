import {JsonService} from '../../providers/json/json-service';
import {DataService} from '../../providers/data/data-service';
import {PluginService} from '../../providers/json/plugin-service';

import {PluginsCategoriesList} from './plugins-categories-list';


export class PluginsCategoriesPresenter {

  private jsonService : JsonService;
  private dataService: DataService;

  public plugins : any = [];
  public pluginsByCategory : any = {};

  public categories = new PluginsCategoriesList();

  constructor(jsonService : JsonService, dataService: DataService) {
    this.jsonService = jsonService;
    this.dataService = dataService;

    (<any> Object).values = (<any> Object).values || (obj => Object.keys(obj).map(key => obj[key]));
    const pluginsList = (<any> Object).values(this.dataService.remote.plugins);
    this.loadPlugins(pluginsList);
  }

  private get service() : PluginService {
    return this.jsonService.plugin;
  }

  public load(callback) {
    //https://github.com/mozilla/localForage
    this.service.getPlugins().subscribe(
      data => {
        this.dataService.updatePlugins(data.plugins);
        this.loadPlugins(data.plugins);
        callback();
      }
    );
  }

  private loadPlugins(plugins) {
    this.plugins = plugins.sort((a, b) => a.name.localeCompare(b.name));
    this.pluginsByCategory = this.separatePluginsByCategory(this.plugins);
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
