import {Rest} from './rest';
import {Router} from './router';

import {Bank} from '../../plugins-manager/model/bank';
import {Pedalboard} from '../../plugins-manager/model/pedalboard';
import {Connection} from '../../plugins-manager/model/connection';


export class PedalboardService {
  private rest : Rest;
  private router : Router;

  constructor(rest : Rest, router : Router) {
    this.rest = rest;
    this.router = router;
  }

  private url(bank : Bank, pedalboard? : Pedalboard) : string {
    let url = `/bank/${bank.index}/pedalboard`;
    if (pedalboard)
      url += `/${bank.pedalboards.indexOf(pedalboard)}`;

    return this.router.route(url);
  }

  saveNew(pedalboard : Pedalboard) {
    let url = this.url(pedalboard.bank);
    return this.rest.post(url, pedalboard.json());
  }

  update(pedalboard : Pedalboard) {
    let url = this.url(pedalboard.bank, pedalboard);

    return this.rest.put(url, pedalboard.json());
  }

  delete(pedalboard : Pedalboard) {
    let url = this.url(pedalboard.bank, pedalboard);
    return this.rest.delete(url);
  }

  move(bank : any, fromIndex : number, toIndex : number) {
    let url = this.moveUrl(bank, fromIndex, toIndex);
    return this.rest.put(url, {});
  }

  private moveUrl(bank : any, fromIndex : number, toIndex : number) : string {
    let url = `/move/bank/${bank.index}/pedalboard/${fromIndex}/to/${toIndex}`;

    return this.router.route(url);
  }

  updateData(pedalboard: Pedalboard, data) {
    const key = 'pedalpi-apk';
    const bank = pedalboard.bank;
    let url = this.router.route(`/bank/${bank.index}/pedalboard/${pedalboard.index}/data/${key}`);

    return this.rest.put(url, data);
  }

  connect(pedalboard: Pedalboard, connection: Connection) {
    const bank = pedalboard.bank;

    let url = this.router.route(`/bank/${bank.index}/pedalboard/${pedalboard.index}/connect`);
    return this.rest.put(url, connection.json());
  }

  disconnect(pedalboard: Pedalboard, connection: Connection) {
    const bank = pedalboard.bank;

    let url = this.router.route(`/bank/${bank.index}/pedalboard/${pedalboard.index}/disconnect`);
    return this.rest.post(url, connection.json());
  }
}
