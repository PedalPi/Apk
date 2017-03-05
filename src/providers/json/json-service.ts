import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {Rest} from './rest';
import {Router} from './router';
import {BanksService} from './banks-service';
import {PedalboardService} from './pedalboard-service';
import {EffectService} from './effect-service';
import {ParamService} from './param-service';

import {PluginService} from './plugin-service';
import {CurrentService} from './current-service';

import {DataService} from "../data/data-service";


@Injectable()
export class JsonService {
  private static DEFAULT_ADDRESS = 'http://localhost:3000';
  public static token = '';

  private rest : Rest;
  private router : Router;

  public banks : BanksService;
  public pedalboard : PedalboardService;
  public effect : EffectService;
  public param : ParamService;

  public plugin : PluginService;
  public current : CurrentService;

  constructor(private data : DataService, http : Http) {
    this.rest = new Rest(http);
    this.router = new Router(this);

    this.banks = new BanksService(this.rest, this.router);
    this.pedalboard = new PedalboardService(this.rest, this.router);
    this.param = new ParamService(this.rest, this.router);
    this.effect = new EffectService(this.rest, this.router);

    this.plugin = new PluginService(this.rest, this.router);
    this.current = new CurrentService(this.rest, this.router);
  }

  public get webServer() {
    return this.data.lastDeviceConnected ? JsonService.prepareUrl(this.data.lastDeviceConnected) : JsonService.DEFAULT_ADDRESS;
  }

  private static prepareUrl(url) : string {
    return `${url.replace("ws", "http")}`.replace('/ws/', '');
  }
}
