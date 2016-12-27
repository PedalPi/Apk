import {Rest} from './rest';
import {Router} from './router';

import {Bank} from '../../plugins-manager/model/bank';


export class BanksService {
  private rest : Rest;
  private router : Router;

  constructor(rest : Rest, router : Router) {
    this.rest = rest;
    this.router = router;
  }

  private urlAll() : string {
    return this.router.route('/banks');
  }

  private url(index? : number) : string {
    let url = index ? `/bank/${index}` : '/bank';
    return this.router.route(url);
  }

  getBanks() {
    return this.rest.get(this.urlAll());
  }

  saveNew(bank : Bank) {
    return this.rest.post(this.url(), bank.json());
  }

  update(bank : Bank) {
    let url = this.url(bank.index);
    return this.rest.put(url, bank.json());
  }

  delete(bank : Bank) {
    let url = this.url(bank.index);
    return this.rest.delete(url);
  }

  swap(bankA : Bank, bankB : Bank) {
    let url = this.swapUrl(bankA.index, bankB.index);
    return this.rest.put(url, {});
  }

  private swapUrl(bankA : number, bankB : number) : string {
    let url = `/swap/bank-a/${bankA}/bank-b/${bankB}`;

    return this.router.route(url);
  }
}
