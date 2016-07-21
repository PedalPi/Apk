import {RestService} from './restService';
import {Router} from './router';


export class PatchService {
  private rest : RestService;
  private router : Router;

  constructor(rest : RestService, router : Router) {
    this.rest = rest;
    this.router = router;
  }

  private patchUrl(bank : any, patch? : any) : string {
    let url = `/bank/${bank.index}`;
    if (patch)
      url += `/patch/${patch.index}`;

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
