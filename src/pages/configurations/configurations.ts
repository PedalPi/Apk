import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {JsonService} from '../../providers/json/json-service';
import {WebSocketService} from '../../providers/websocket/web-socket-service';

@Component({
  templateUrl: 'configurations.html'
})
export class ConfigurationsPage {
  public ip : string;

  constructor(private nav : NavController, private ws : WebSocketService) {
    this.ip = JsonService.server;
  }

  apply() {
    this.setIp(this.ip);
  }

  setIp(ip : string) {
    JsonService.server = ip;
    this.ws.connect(WebSocketService.prepareUrl(ip));
  }
}
