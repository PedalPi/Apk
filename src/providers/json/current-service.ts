import {Rest} from './rest';
import {Router} from './router';

import {Effect} from '../../plugins-manager/model/effect';
import {Pedalboard} from '../../plugins-manager/model/pedalboard';


export class CurrentService {
  private rest : Rest;
  private router : Router;

  constructor(rest : Rest, router : Router) {
    this.rest = rest;
    this.router = router;
  }

  setPedalboard(pedalboard : Pedalboard) {
    let url = this.currentPedalboardUrl(pedalboard);
    return this.rest.put(url);
  }

  private currentPedalboardUrl(pedalboard : Pedalboard) : string {
    const bank = pedalboard.bank
    let url = `/current/bank/${bank.index}/pedalboard/${pedalboard.index}`;
    return this.router.route(url);
  }

  toggleStatusEffect(effect : Effect) {
    let url = this.toggleStatusEffectUrl(effect);
    return this.rest.put(url, {});
  }

  private toggleStatusEffectUrl(effect : Effect) : string {
    let url = `/current/effect/${effect.index}`;
    return this.router.route(url);
  }

  current() {
    let url = this.currentUrl();
    return this.rest.get(url);
  }

  private currentUrl() : string {
    let url = `/current`;
    return this.router.route(url);
  }

  currentData() {
    let url = this.currentDataUrl();
    return this.rest.get(url);
  }

  private currentDataUrl() : string {
    let url = `/current/data`;
    return this.router.route(url);
  }
}
