import {RestService} from './restService';
import {Router} from './router';


export class BanksService {
  private rest : RestService;
  private router : Router;

  constructor(rest : RestService, router : Router) {
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
}
