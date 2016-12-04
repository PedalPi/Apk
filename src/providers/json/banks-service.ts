import {Rest} from './rest';
import {Router} from './router';


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

  saveNew(bank : any) {
    return this.rest.post(this.url(), bank);
  }

  update(bank : any, index : number) {
    let url = this.url(index);
    return this.rest.put(url, bank);
  }

  delete(bank : number) {
    let url = this.url(bank);
    return this.rest.delete(url);
  }

  swap(bankA : number, bankB : number) {
    let url = this.swapUrl(bankA, bankB);
    return this.rest.put(url, {});
  }

  private swapUrl(bankA : number, bankB : number) : string {
    let url = `/swap/bank-a/${bankA}/bank-b/${bankB}`;

    return this.router.route(url);
  }
}
