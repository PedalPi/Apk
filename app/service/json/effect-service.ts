import {Rest} from './rest';
import {Router} from './router';


export class EffectService {
  private rest : Rest;
  private router : Router;

  constructor(rest : Rest, router : Router) {
    this.rest = rest;
    this.router = router;
  }

  private effectUrl(bank : any, patch : any, effect? : any) : string {
    const patchIndex = bank.patches.indexOf(patch);
    let url = `/bank/${bank.index}/patch/${patchIndex}/effect`;

    if (effect) {
      const effectIndex = patch.effects.indexOf(effect);
      url += `/${effectIndex}`;
    }

    return this.router.route(url);
  }

  getEffect(bank : any, patch : any, effect : any) {
    let url = this.effectUrl(bank, patch, effect);
    return this.rest.get(url);
  }

  saveNewEffect(bank : any, patch : any, effect : any) {
    let url = this.effectUrl(bank, patch);
    return this.rest.post(url, effect);
  }

  deleteEffect(bank : any, patch : any, effect : any) {
    let url = this.effectUrl(bank, patch, effect);
    return this.rest.delete(url);
  }
}
