import {Rest} from './rest';
import {Router} from './router';


export class CurrentService {
  private rest : Rest;
  private router : Router;

  constructor(rest : Rest, router : Router) {
    this.rest = rest;
    this.router = router;
  }

  setPedalboard(bank : any, pedalboard : any) {
    let url = this.currentPedalboardUrl(bank, pedalboard);
    return this.rest.put(url);
  }

  private currentPedalboardUrl(bank : any, pedalboard : any) : string {
    let pedalboardIndex = bank.pedalboards.indexOf(pedalboard);

    let url = `/current/bank/${bank.index}/pedalboard/${pedalboardIndex}`;
    return this.router.route(url);
  }

  toggleStatusEffect(bank : any, pedalboard : any, effect : any) {
    let url = this.toggleStatusEffectUrl(bank, pedalboard, effect);
    return this.rest.put(url, {});
  }

  private toggleStatusEffectUrl(bank : any, pedalboard : any, effect : any) : string {
    let pedalboardIndex = bank.pedalboards.indexOf(pedalboard);
    let effectIndex = pedalboard.effects.indexOf(effect);

    let url = `/current/effect/${effectIndex}`;
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
    let url = this.currentUrl();
    return this.rest.get(url);
  }

  private currentDataUrl() : string {
    let url = `/current/data`;
    return this.router.route(url);
  }
}
