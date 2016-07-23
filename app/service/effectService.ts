import {Rest} from './rest';
import {Router} from './router';


export class EffectService {
  private rest : Rest;
  private router : Router;

  constructor(rest : Rest, router : Router) {
    this.rest = rest;
    this.router = router;
  }

  private effectUrl(bank : any, patch : any, effect : any) : string {
    let url = `/bank/${bank.index}/patch/${patch.index}`;
    if (patch)
      url += `/effect/${effect.index}`;

    return this.router.route(url);
  }

  getEffect(bank : any, patch : any, effect : any) {
    let url = this.effectUrl(bank, patch, effect);
    return this.rest.get(url);
  }

  saveNewEffect(bank : any, patch : any, effect : any) {
    let url = this.effectUrl(bank, patch, effect);
    return this.rest.post(url, effect);
  }

  deleteBank(bank : any, patch : any, effect : any) {
    let url = this.effectUrl(bank, patch, effect);
    return this.rest.delete(url);
  }
}
