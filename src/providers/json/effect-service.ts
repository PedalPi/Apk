import {Rest} from './rest';
import {Router} from './router';

import {Bank} from '../../plugins-manager/model/bank';
import {Pedalboard} from '../../plugins-manager/model/pedalboard';
import {Effect} from '../../plugins-manager/model/effect';
import {Lv2Effect} from '../../plugins-manager/model/lv2/lv2-effect';


export class EffectService {
  private rest : Rest;
  private router : Router;

  constructor(rest : Rest, router : Router) {
    this.rest = rest;
    this.router = router;
  }

  private url(pedalboard : Pedalboard, effect? : Effect) : string {
    const bank : Bank = pedalboard.bank;
    let url = `/bank/${bank.index}/pedalboard/${pedalboard.index}/effect`;

    if (effect)
      url += `/${effect.index}`;

    return this.router.route(url);
  }

  saveNew(effect : Effect) {
    let url = this.url(effect.pedalboard);
    return this.rest.post(url, (<Lv2Effect> effect).plugin.uri);
  }

  delete(effect : Effect) {
    let url = this.url(effect.pedalboard, effect);
    return this.rest.delete(url);
  }
}
