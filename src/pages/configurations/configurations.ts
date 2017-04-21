import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {TranslateService} from '@ngx-translate/core';

import {DataService} from '../../providers/data/data-service';
import {WebSocketService} from '../../providers/websocket/web-socket-service';

import {AboutPage} from '../about/about';
import {ConnectionPage} from '../connection/connection';

@Component({
  selector: 'page-configurations',
  templateUrl: 'configurations.html'
})
export class ConfigurationsPage {
  constructor(
    private data : DataService,
    private nav : NavController,
    private ws : WebSocketService,
    private translate: TranslateService) {}

  get connectedColor() {
    return this.ws.connected ? "#08AE97" : "danger";
  }

  about() {
    this.nav.push(AboutPage);
  }

  connection() {
    this.nav.push(ConnectionPage);
  }

  set language(language) {
    this.data.language = language;
    this.translate.setDefaultLang(language);
  }

  get language() {
    return this.data.language;
  }
}
