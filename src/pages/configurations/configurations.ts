import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {TranslateService} from '@ngx-translate/core';

import {JsonService} from '../../providers/json/json-service';
import {DataService} from '../../providers/data/data-service';
import {WebSocketService} from '../../providers/websocket/web-socket-service';

import {DeviceConfigurationsPage} from './device/device';

import {AboutPage} from '../about/about';


@Component({
  selector: 'page-configurations',
  templateUrl: 'configurations.html'
})
export class ConfigurationsPage {
  constructor(
    private data : DataService,
    private nav : NavController,
    private ws : WebSocketService,
    private translate: TranslateService,
    private jsonService : JsonService) {}

  selectOptions = {
    cssClass: 'flags-translate'
  };

  get configurations() {
    return this.jsonService.configurations;
  }

  get connectedColor() {
    return this.ws.connected ? "#08AE97" : "danger";
  }

  about() {
    this.nav.push(AboutPage);
  }

  goToDevice() {
    this.nav.push(DeviceConfigurationsPage);
  }

  get deviceName() {
    return this.data.remote.configurations.device.name;
  }

  get deviceAddress() {
    return this.jsonService.webServer;
  }

  set language(language) {
    this.data.language = language;
    this.translate.setDefaultLang(language);
  }

  get language() {
    return this.data.language;
  }
}
