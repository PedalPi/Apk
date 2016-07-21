import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

import {RestService} from './restService';
import {Router} from './router';
import {BanksService} from './banksService';
import {PluginService} from './pluginService';

//const server = 'http://trick-group-3000.codio.io';
const server = 'http://localhost:3000';

@Injectable()
export class JsonService {
  private rest : RestService;
  private router : Router;

  public banks : BanksService;
  public plugin : PluginService;

  constructor(http : Http) {
    this.rest = new RestService(http);
    this.router = new Router(server);

    this.banks = new BanksService(this.rest, this.router);
    this.plugin = new PluginService(this.rest, this.router);
  }
}
