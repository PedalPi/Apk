import {Rest} from './rest';
import {Router} from './router';

import {JsonBaseService} from './json-base-service'

import {Bank} from '../../plugins-manager/model/bank';


export class BanksService extends JsonBaseService {

  constructor(rest : Rest, router : Router) {
    super(rest, router);
  }

  private url(index? : number) : string {
    return index != undefined ? `/bank/${index}` : '/bank';
  }

  getBanks() {
    return this.get('/banks');
  }

  saveNew(bank : Bank) {
    return this.post(this.url(), bank.json());
  }

  update(bank : Bank) {
    let url = this.url(bank.index);
    return this.put(url, bank.json());
  }

  remove(bank : Bank) {
    let url = this.url(bank.index);
    return this.delete(url);
  }

  swap(bankA : Bank, bankB : Bank) {
    const url = `/swap/bank-a/${bankA}/bank-b/${bankB}`;
    return this.put(url);
  }
}
