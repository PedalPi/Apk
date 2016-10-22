import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {JsonService} from '../../service/json/json-service';
import {WebSocketService} from '../../service/websocket/web-socket-service';

@Component({
  templateUrl: 'build/pages/configurations/configurations.html'
})
export class ConfigurationsPage {
  constructor(private nav : NavController, private ws : WebSocketService) {}

  get ip() {
    return JsonService.server;
  }

  setIp(ip : string) {
    JsonService.server = ip;
    this.ws.connect(WebSocketService.prepareUrl(ip));
  }
}
