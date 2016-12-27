import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {JsonService} from '../../providers/json/json-service';
import {WebSocketService} from '../../providers/websocket/web-socket-service';

import {AboutPage} from '../about/about';


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

  about() {
    this.nav.push(AboutPage);
  }

  sameAddress() {
    this.ip = `http://${window.location.hostname}:3000`
  }
}
