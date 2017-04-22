import {ApplicationRef} from '@angular/core';
import {ToastController} from 'ionic-angular';

import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {JsonService} from '../../providers/json/json-service';
import {WebSocketService} from '../../providers/websocket/web-socket-service';

import {Zeroconf, Device} from './zeroconf';


@Component({
  selector: 'page-connection',
  templateUrl: 'connection.html'
})
export class ConnectionPage {
  public ipInput : string;
  public autoSearch : boolean;
  public devices : Array<any>;

  private zeroconf : Zeroconf;
  public finding = false;
  public toast: any;

  constructor(
      private nav : NavController,
      private ws : WebSocketService,
      private ref: ApplicationRef,
      private toastCtrl : ToastController,
      private jsonService : JsonService) {
    this.ipInput = jsonService.webServer.replace('http://', '').replace(':3000', '');
    this.autoSearch = !this.emulated;

    this.devices = [];
    this.zeroconf = new Zeroconf('_pedalpi._tcp.', 'local.');
    this.zeroconf.onDiscoveredListener = device => this.addDevice(device);
    this.zeroconf.onEndDiscoverListener = () => this.endDiscover();
  }

  get connectedColor() {
    return this.ws.connected ? "#08AE97" : "danger";
  }

  tryConnect() {
    let url = `http://${this.ipInput}:3000`;
    this.ws.tryConnect(WebSocketService.prepareUrl(url));
  }

  sameAddress() {
    this.ipInput = window.location.hostname;
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
    console.log('connect')
    this.zeroconf.stopDiscover();
    this.endDiscover();
    this.ipInput = device.address.ipv4;
    //this.setIp(`http://${device.address.ipv4}:${device.address.port}`);
    this.tryConnect();
  }
}
