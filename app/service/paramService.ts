import {Rest} from './rest';
import {Router} from './router';


export class ParamService {
  private rest : Rest;
  private router : Router;

  constructor(rest : Rest, router : Router) {
    this.rest = rest;
    this.router = router;
  }

  private paramUrl(bank : any, patch : any, effect : any, param : any) : string {
    let patchIndex = bank.patches.indexOf(patch);
    let effectIndex = patch.effects.indexOf(effect);

    let url = `/bank/${bank.index}/patch/${patchIndex}/effect/${effectIndex}/param/${param.index}`;
    return this.router.route(url);
  }

  getParam(bank : any, patch : any, effect : any, param : any) {
    let url = this.paramUrl(bank, patch, effect, param);
    return this.rest.get(url);
  }

  updateParam(bank : any, patch : any, effect : any, param : any) {
    let url = this.paramUrl(bank, patch, effect, param);
    return this.rest.put(url, param.value);
  }
}
