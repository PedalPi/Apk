import {RestService} from './restService';
import {Router} from './router';


export class PluginService {
  private rest : RestService;
  private router : Router;

  constructor(rest : RestService, router : Router) {
    this.rest = rest;
    this.router = router;
  }

  private get pluginsUrl() : string {
    return this.router.route(`/effects`);
  }

  getPlugins() {
    return this.rest.get(this.pluginsUrl);
  }
}
