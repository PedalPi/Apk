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
}
