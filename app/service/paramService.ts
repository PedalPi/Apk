import {RestService} from './restService';
import {Router} from './router';


export class Service {
  private rest : RestService;
  private router : Router;

  constructor(rest : RestService, router : Router) {
    this.rest = rest;
    this.router = router;
  }

  private paramUrl(bank : any, patch : any, effect : any, param : any) : string {
    let url = `/bank/${bank.index}/patch/${patch.index}/effect/${effect.index}/${param.index}`;
    return this.router.route(url);
  }

  getParam(bank : any, patch : any, effect : any, param : any) {
    let url = this.paramUrl(bank, patch, effect, param);
    return this.rest.get(url);
  }

  updateParam(bank : any, patch : any, effect : any, param : any) {
    let url = this.paramUrl(bank, patch, effect, param);
    return this.rest.put(url, param);
  }
}
