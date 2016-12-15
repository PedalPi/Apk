import {JsonService} from '../../providers/json/json-service';
import {PluginService} from '../../providers/json/plugin-service';


export class PluginsPresenter {

  private jsonService : JsonService;
  public effects : any = [];
  public effectsByCategory : any = {};

  public categories = [];

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

        this.categories = Object.keys(this.effectsByCategory)
          .sort((a, b) => a.localeCompare(b))
          .filter((current) => this.filterCategories.indexOf(current) === -1);
      }
    );
  }

  private sort(list) {
    return list;
  }

  private get filterCategories() {
    return [
      'Analyser', 'Expander', 'Generator', 'Instrument', 'Oscillator',
      'Highpass', 'Lowpass', 'Multiband', 'Parametric', 'Spectral',
      'Waveshaper',
    ];
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
