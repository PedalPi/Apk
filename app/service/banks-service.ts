import {Rest} from './rest';
import {Router} from './router';


export class BanksService {
  private rest : Rest;
  private router : Router;

  constructor(rest : Rest, router : Router) {
    this.rest = rest;
    this.router = router;
  }

  private banksUrl() : string {
    return this.router.route('/banks');
  }

  private bankUrl(bank? : any) : string {
    let url = bank ? `/bank/${bank.index}` : '/bank';
    return this.router.route(url);
  }

  getBanks() {
    return this.rest.get(this.banksUrl());
  }

  saveNewBank(bank) {
    return this.rest.post(this.bankUrl(), bank);
  }

  updateBank(bank) {
    let url = this.bankUrl(bank);
    return this.rest.put(url, bank);
  }

  deleteBank(bank) {
    let url = this.bankUrl(bank);
    return this.rest.delete(url);
  }

  swapPatches(bank : any, patchA : number, patchB : number) {
    let url = this.swapPatchesUrl(bank, patchA, patchB);
    return this.rest.put(url, {});
  }

  private swapPatchesUrl(bank : any, patchA : number, patchB : number) : string {
    let url = `/swap/patch/bank/${bank.index}/patch-a/${patchA}/patch-b/${patchB}`;

    return this.router.route(url);
  }

  swapBanks(bankA : number, bankB : number) {
    let url = this.swapBanksUrl(bankA, bankB);
    return this.rest.put(url, {});
  }

  private swapBanksUrl(bankA : number, bankB : number) : string {
    let url = `/swap/bank-a/${bankA}/bank-b/${bankB}`;

    return this.router.route(url);
  }
}
