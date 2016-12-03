import {Rest} from './rest';
import {Router} from './router';


export class ParamService {
  private rest : Rest;
  private router : Router;

  constructor(rest : Rest, router : Router) {
    this.rest = rest;
    this.router = router;
  }

  private paramUrl(bank : any, pedalboard : any, effect : any, param : any) : string {
    let pedalboardIndex = bank.pedalboards.indexOf(pedalboard);
    let effectIndex = pedalboard.effects.indexOf(effect);
    let paramIndex = effect.pluginData.ports.control.input.indexOf(param);

    let url = `/bank/${bank.index}/pedalboard/${pedalboardIndex}/effect/${effectIndex}/param/${paramIndex}`;
    return this.router.route(url);
  }

  getParam(bank : any, pedalboard : any, effect : any, param : any) {
    let url = this.paramUrl(bank, pedalboard, effect, param);
    return this.rest.get(url);
  }

  updateParam(bank : any, pedalboard : any, effect : any, param : any) {
    let url = this.paramUrl(bank, pedalboard, effect, param);
    return this.rest.put(url, param.value);
  }
}
