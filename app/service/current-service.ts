import {Rest} from './rest';
import {Router} from './router';


export class CurrentService {
  private rest : Rest;
  private router : Router;

  constructor(rest : Rest, router : Router) {
    this.rest = rest;
    this.router = router;
  }

  setPatch(bank : any, patch : any) {
    let url = this.currentPatchUrl(bank, patch);
    return this.rest.put(url);
  }

  private currentPatchUrl(bank : any, patch : any) : string {
    let patchIndex = bank.patches.indexOf(patch);

    let url = `/current/bank/${bank.index}/patch/${patchIndex}`;
    return this.router.route(url);
  }

  toggleStatusEffect(bank : any, patch : any, effect : any) {
    let url = this.toggleStatusEffectUrl(bank, patch, effect);
    return this.rest.put(url, {});
  }

  private toggleStatusEffectUrl(bank : any, patch : any, effect : any) : string {
    let patchIndex = bank.patches.indexOf(patch);
    let effectIndex = patch.effects.indexOf(effect);

    let url = `/current/effect/${effectIndex}>`;
    return this.router.route(url);
  }
}
