import {Rest} from './rest';
import {Router} from './router';


export class PedalboardService {
  private rest : Rest;
  private router : Router;

  constructor(rest : Rest, router : Router) {
    this.rest = rest;
    this.router = router;
  }

  private url(bank : any, pedalboard? : any) : string {
    let url = `/bank/${bank.index}/pedalboard`;
    if (pedalboard)
      url += `/${bank.pedalboards.indexOf(pedalboard)}`;

    return this.router.route(url);
  }

  get(bank : any, pedalboard : any) {
    let url = this.url(bank, pedalboard);
    return this.rest.get(url);
  }

  saveNew(bank : any, pedalboard : any) {
    let url = this.url(bank);
    return this.rest.post(url, pedalboard);
  }

  update(bank : any, pedalboard : any) {
    let url = this.url(bank, pedalboard);
    return this.rest.put(url, pedalboard);
  }

  delete(bank : any, pedalboard : any) {
    let url = this.url(bank, pedalboard);
    return this.rest.delete(url);
  }

  swap(bank : any, pedalboardA : number, pedalboardB : number) {
    let url = this.swapUrl(bank, pedalboardA, pedalboardB);
    return this.rest.put(url, {});
  }

  private swapUrl(bank : any, pedalboardA : number, pedalboardB : number) : string {
    let url = `/swap/pedalboard/bank/${bank.index}/pedalboard-a/${pedalboardA}/pedalboard-b/${pedalboardB}`;

    return this.router.route(url);
  }
}
