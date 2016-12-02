import {Rest} from './rest';
import {Router} from './router';


export class PedalboardService {
  private rest : Rest;
  private router : Router;

  constructor(rest : Rest, router : Router) {
    this.rest = rest;
    this.router = router;
  }

  private pedalboardUrl(bank : any, pedalboard? : any) : string {
    let url = `/bank/${bank.index}/pedalboard`;
    if (pedalboard)
      url += `/${bank.pedalboards.indexOf(pedalboard)}`;

    return this.router.route(url);
  }

  getPedalboard(bank : any, pedalboard : any) {
    let url = this.pedalboardUrl(bank, pedalboard);
    return this.rest.get(url);
  }

  saveNewPedalboard(bank : any, pedalboard : any) {
    let url = this.pedalboardUrl(bank);
    return this.rest.post(url, pedalboard);
  }

  updatePedalboard(bank : any, pedalboard : any) {
    let url = this.pedalboardUrl(bank, pedalboard);
    return this.rest.put(url, pedalboard);
  }

  deletePedalboard(bank : any, pedalboard : any) {
    let url = this.pedalboardUrl(bank, pedalboard);
    return this.rest.delete(url);
  }

  swapEffects(bank : any, pedalboard : any, effecA : number, effectB : number) {
    let url = this.swapEffectsUrl(bank, pedalboard, effecA, effectB);
    return this.rest.put(url, {});
  }

  private swapEffectsUrl(bank : any, pedalboard : any, effectA : number, effectB : number) : string {
    let pedalboardIndex = bank.pedalboards.indexOf(pedalboard);

    let url = `/swap/effect/bank/${bank.index}/pedalboard/${pedalboardIndex}/effect-a/${effectA}/effect-b/${effectB}`;

    return this.router.route(url);
  }
}
