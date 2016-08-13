import {Rest} from './rest';
import {Router} from './router';


export class PatchService {
  private rest : Rest;
  private router : Router;

  constructor(rest : Rest, router : Router) {
    this.rest = rest;
    this.router = router;
  }

  private patchUrl(bank : any, patch? : any) : string {
    let url = `/bank/${bank.index}/patch`;
    if (patch)
      url += `/${bank.patches.indexOf(patch)}`;

    return this.router.route(url);
  }

  getPatch(bank : any, patch : any) {
    let url = this.patchUrl(bank, patch);
    return this.rest.get(url);
  }

  saveNewPatch(bank : any, patch : any) {
    let url = this.patchUrl(bank);
    return this.rest.post(url, patch);
  }

  updatePatch(bank : any, patch : any) {
    let url = this.patchUrl(bank, patch);
    return this.rest.put(url, patch);
  }

  deletePatch(bank : any, patch : any) {
    let url = this.patchUrl(bank, patch);
    return this.rest.delete(url);
  }

  swapEffects(bank : any, patch : any, effecA : number, effectB : number) {
    let url = this.swapEffectsUrl(bank, patch, effecA, effectB);
    return this.rest.put(url, {});
  }

  private swapEffectsUrl(bank : any, patch : any, effectA : number, effectB : number) : string {
    let patchIndex = bank.patches.indexOf(patch);

    let url = `/swap/effect/bank/${bank.index}/patch/${patchIndex}/effect-a/${effectA}/effect-b/${effectB}`;

    return this.router.route(url);
  }
}
