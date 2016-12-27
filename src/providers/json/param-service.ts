import {Rest} from './rest';
import {Router} from './router';

import {Lv2Param} from '../../plugins-manager/model/lv2/lv2-param';


export class ParamService {
  private rest : Rest;
  private router : Router;

  constructor(rest : Rest, router : Router) {
    this.rest = rest;
    this.router = router;
  }

  private paramUrl(param : Lv2Param) : string {
    const effect = param.effect
    const pedalboard = effect.pedalboard
    const bank = pedalboard.bank

    let url = `/bank/${bank.index}/pedalboard/${pedalboard.index}/effect/${effect.index}/param/${param.relativeIndex}`;
    return this.router.route(url);
  }

  getParam(param : Lv2Param) {
    let url = this.paramUrl(param);
    return this.rest.get(url);
  }

  updateParam(param : Lv2Param) {
    let url = this.paramUrl(param);
    return this.rest.put(url, param.value);
  }
}
