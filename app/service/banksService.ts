import {RestService} from './restService';
import {Router} from './router';


export class BanksService {
  private rest : RestService;
  private router : Router;

  constructor(rest : RestService, router : Router) {
    this.rest = rest;
    this.router = router;
  }

  get banks() : String {
    return this.router.route('/banks');
  }

  get bank() : String {
    return this.router.route('/bank');
  }

  getBanks() {
    return this.rest.get(this.banks);
  }

  saveBank(bankJson) {
    return this.rest.post(this.bank, bankJson);
  }

  editBank(bankJson) {
    return this.rest.put(this.bank, bankJson);
  }

  deleteBank(bankJson) {
    return this.rest.delete(this.bank, bankJson);
  }
}
