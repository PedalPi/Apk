import {Rest} from './rest';
import {Router} from './router';


export class PluginService {
  private rest : Rest;
  private router : Router;

  constructor(rest : Rest, router : Router) {
    this.rest = rest;
    this.router = router;
  }

  getPlugins() {
    return this.rest.get(this.pluginsUrl);
  }

  private get pluginsUrl() : string {
    return this.router.route(`/plugins`);
  }

  refreshPlugins() {
    return this.rest.put(this.refreshPluginsUrl);
  }

  private get refreshPluginsUrl() : string {
    return this.router.route(`/plugins/reload`);
  }
}
