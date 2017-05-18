import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {TranslateService} from '@ngx-translate/core';

import {JsonService} from '../../../providers/json/json-service';
import {DataService} from '../../../providers/data/data-service';
import {WebSocketService} from '../../../providers/websocket/web-socket-service';


@Component({
  selector: 'page-device-configurations',
  templateUrl: 'device.html'
})
export class DeviceConfigurationsPage {
  constructor(
    private data : DataService,
    private nav : NavController,
    private ws : WebSocketService,
    private translate: TranslateService,
    private jsonService : JsonService) {}

  get configurations() {
    return this.jsonService.configurations;
  }

  get connectedColor() {
    return this.ws.connected ? "#08AE97" : "danger";
  }

  connection() {
    this.ws.view.showConnectionModal();
  }

  get address() {
    return this.jsonService.webServer;
  }

  get name() {
    return this.data.remote.configurations.device.name;
  }
}
