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

  discover() {
    const zeroconf = cordova.plugins.zeroconf;

    //zeroconf.register('_http._tcp.', 'local.', 'Becvert\'s iPad', 80, {'foo' : 'bar'}, result => console.log(result));

    zeroconf.watch(
      '_http._tcp.', 'local.',
      result => {
        console.log('watch');
        console.log(result);

        if (result.action == 'added')
            console.log('service added');
        else
            console.log('service removed');
      },
      error => console.log(error)
    );

    zeroconf.getHostname(
      hostname => console.log(hostname),
      error => console.log(error)
    ); // ipad-of-becvert.local.
  }
}
