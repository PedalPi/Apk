import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

import {RestService} from './restService';
import {Router} from './router';
import {BanksService} from './banksService';

const server = 'http://trick-group-3000.codio.io';

@Injectable()
export class JsonService {
  private rest : RestService;
  private router : Router;

  public banks : BanksService;

  constructor(http : Http) {
    this.rest = new RestService(http);
    this.router = new Router(server);

    this.banks = new BanksService(this.rest, this.router);
  }
}
