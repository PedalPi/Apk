import {Rest} from './rest';
import {Router} from './router';


export class PluginService {
  private rest : Rest;
  private router : Router;

  constructor(rest : Rest, router : Router) {
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
