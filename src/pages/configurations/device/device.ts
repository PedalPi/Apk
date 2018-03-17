import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {TranslateService} from '@ngx-translate/core';

import {JsonService} from '../../../providers/json/json-service';
import {DataService} from '../../../providers/data/data-service';
import {WebSocketService} from '../../../providers/websocket/web-socket-service';

import {AlertBuilder} from '../../../common/alert';

@Component({
  selector: 'page-device-configurations',
  templateUrl: 'device.html'
})
export class DeviceConfigurationsPage {
  constructor(
    private data : DataService,
    private nav : NavController,
    private ws : WebSocketService,
    private alert : AlertController,
    private translate: TranslateService,
    private jsonService : JsonService) {}

  private get configurations() {
    return this.jsonService.configurations;
  }

  private get alertBuilder() {
    return new AlertBuilder(this.alert, this.translate);
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

  renameDevice() {
    let builder = this.alertBuilder;

    builder.title('RENAME_DEVICE');
    builder.callback((data) => this.requestRenameDevice(data.name));
    builder.defaultValue(this.name);

    builder.generateSaveAlert().present();
  }

  private async requestRenameDevice(newName) {
    await this.configurations.setDeviceName(newName).toPromise();
    this.data.remote.configurations.device.name = newName;
  }
}
