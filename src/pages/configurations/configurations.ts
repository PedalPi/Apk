import {ApplicationRef} from '@angular/core';
import {ToastController} from 'ionic-angular';

import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {JsonService} from '../../providers/json/json-service';
import {WebSocketService} from '../../providers/websocket/web-socket-service';

import {AboutPage} from '../about/about';

import {Zeroconf, Device} from './zeroconf';


@Component({
  selector: 'page-configurations',
  templateUrl: 'configurations.html'
})
export class ConfigurationsPage {
  public ip : string;
  public autoSearch : boolean;
  public devices : Array<any>;

  private zeroconf : Zeroconf;
  public finding = false;
  public toast: any;

  constructor(private nav : NavController, private ws : WebSocketService, private ref: ApplicationRef, private toastCtrl : ToastController) {
    this.ip = JsonService.server;
    this.autoSearch = !this.emulated;

    this.devices = [];
    this.zeroconf = new Zeroconf('_pedalpi._tcp.', 'local.');
    this.zeroconf.onDiscoveredListener = device => this.addDevice(device);
    this.zeroconf.onEndDiscoverListener = () => this.endDiscover();
  }

  get connectedColor() {
    return this.ws.connected ? "#08AE97" : "danger";
  }

  apply() {
    this.setIp(this.ip);
  }

  private setIp(ip : string) {
    this.ip = ip;
    JsonService.server = ip;
    this.ws.connect(WebSocketService.prepareUrl(ip));
  }

  about() {
    this.nav.push(AboutPage);
  }

  sameAddress() {
    this.ip = `http://${window.location.hostname}:3000`
  }

  get emulated() {
    return (<any> window).cordova == undefined;
  }

  startDiscover() {
    this.toast = this.toastCtrl.create({
      message: `Finding devices`
    });
    this.toast.present();

    this.finding = true;
    this.devices = [];

    this.zeroconf.discover();
  }

  endDiscover() {
    this.toast.dismiss();
    this.finding = false;
  }

  addDevice(device : Device) {
    if (this.devices.filter(d => d.equals(device)).length > 0)
      return;

    this.devices.push(device);
    this.ref.tick();
  }

  connect(device : Device) {
    this.zeroconf.stopDiscover();
    this.endDiscover();
    this.setIp(`http://${device.address.ipv4}:${device.address.port}`);
  }
}
