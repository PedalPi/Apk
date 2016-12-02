import {Rest} from './rest';
import {Router} from './router';


export class EffectService {
  private rest : Rest;
  private router : Router;

  constructor(rest : Rest, router : Router) {
    this.rest = rest;
    this.router = router;
  }

  private effectUrl(bank : any, pedalboard : any, effect? : any) : string {
    const pedalboardIndex = bank.pedalboards.indexOf(pedalboard);
    let url = `/bank/${bank.index}/pedalboard/${pedalboardIndex}/effect`;

    if (effect) {
      const effectIndex = pedalboard.effects.indexOf(effect);
      url += `/${effectIndex}`;
    }

    return this.router.route(url);
  }

  getEffect(bank : any, pedalboard : any, effect : any) {
    let url = this.effectUrl(bank, pedalboard, effect);
    return this.rest.get(url);
  }

  saveNewEffect(bank : any, pedalboard : any, effect : any) {
    let url = this.effectUrl(bank, pedalboard);
    return this.rest.post(url, effect);
  }

  deleteEffect(bank : any, pedalboard : any, effect : any) {
    let url = this.effectUrl(bank, pedalboard, effect);
    return this.rest.delete(url);
  }
}
