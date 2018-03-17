import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Rest} from './rest';
import {Router} from './router';

import {AuthService} from './auth-service';
import {BanksService} from './banks-service';
import {PedalboardService} from './pedalboard-service';
import {EffectService} from './effect-service';
import {ParamService} from './param-service';

import {PluginService} from './plugin-service';
import {CurrentService} from './current-service';

import {ConfigurationsService} from './configurations-service';

import {DataService} from "../data/data-service";

@Injectable()
export class JsonService {
  public static CURRENT_VERSION = 'v1';
  public static token : string = null;

  private rest : Rest;
  private router : Router;

  public readonly auth : AuthService;

  public readonly banks : BanksService;
  public readonly pedalboard : PedalboardService;
  public readonly effect : EffectService;
  public readonly param : ParamService;

  public readonly plugin : PluginService;
  public readonly current : CurrentService;
  public readonly configurations : ConfigurationsService;

  constructor(private data : DataService, http : HttpClient) {
    this.rest = new Rest(http);
    this.router = new Router(this);

    this.banks = new BanksService(this.rest, this.router);
    this.pedalboard = new PedalboardService(this.rest, this.router);
    this.param = new ParamService(this.rest, this.router);
    this.effect = new EffectService(this.rest, this.router);

    this.plugin = new PluginService(this.rest, this.router);
    this.current = new CurrentService(this.rest, this.router);
    this.configurations = new ConfigurationsService(this.rest, this.router);

    this.auth = new AuthService(this.rest, this.router);
  }

  public get webServer() {
    return JsonService.prepareUrl(this.data.lastDeviceConnected);
  }

  private static prepareUrl(url) : string {
    return `${url.replace("ws", "http")}`.replace('/ws/', '');
  }
}
