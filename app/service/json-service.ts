import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

import {Rest} from './rest';
import {Router} from './router';
import {BanksService} from './banks-service';
import {PatchService} from './patch-service';
import {EffectService} from './effect-service';
import {ParamService} from './param-service';

import {PluginService} from './plugin-service';
import {CurrentService} from './current-service';


@Injectable()
export class JsonService {
  public static server = 'http://localhost:3000';

  private rest : Rest;
  private router : Router;

  public banks : BanksService;
  public patch : PatchService;
  public effect : EffectService;
  public param : ParamService;

  public plugin : PluginService;
  public current : CurrentService;

  constructor(http : Http) {
    this.rest = new Rest(http);
    this.router = new Router(JsonService.server);

    this.banks = new BanksService(this.rest, this.router);
    this.patch = new PatchService(this.rest, this.router);
    this.param = new ParamService(this.rest, this.router);
    this.effect = new EffectService(this.rest, this.router);

    this.plugin = new PluginService(this.rest, this.router);
    this.current = new CurrentService(this.rest, this.router);
  }
}
