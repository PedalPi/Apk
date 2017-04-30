import {ApplicationRef} from '@angular/core';
import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {ToastController} from 'ionic-angular';

import { Network } from '@ionic-native/network';


import {JsonService} from '../../providers/json/json-service';
import {WebSocketService} from '../../providers/websocket/web-socket-service';

import {Zeroconf, Device} from './zeroconf';
import {TranslateService} from '@ngx-translate/core';


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

  private connection = {
    connect: null,
    disconnect: null
  };

  public online : boolean;
  public showButtonNetworkConfiguration : boolean = true;

  constructor(
      private nav : NavController,
      private ws : WebSocketService,
      private ref: ApplicationRef,
      private toastCtrl : ToastController,
      private jsonService : JsonService,
      private network : Network,
      private translate : TranslateService
    ) {
    this.ipInput = jsonService.webServer.replace('http://', '').replace(':3000', '');
    this.autoSearch = !this.emulated;

    this.devices = [];
    this.zeroconf = new Zeroconf('_pedalpi._tcp.', 'local.');
    this.zeroconf.onDiscoveredListener = device => this.addDevice(device);
    this.zeroconf.onEndDiscoverListener = () => this.endDiscover();
  }

  ionViewWillEnter() {
    this.online = navigator.onLine;

    this.connection.disconnect = this.network.onDisconnect().subscribe(() => this.online = false);
    this.connection.connect = this.network.onConnect().subscribe(() => this.online = true);

    let cordova = (<any> window).cordova;
    this.showButtonNetworkConfiguration = cordova && cordova.plugins.settings

    if (this.autoSearch)
      this.startDiscover();
  }

  ionViewWillLeave() {
    this.connection.disconnect.unsubscribe();
    this.connection.connect.unsubscribe();
  }

  get connected() {
    return this.ws.connected;
  }

  get connectedColor() {
    return this.connected ? "#08AE97" : "danger";
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

  async startDiscover() {
    let message = await this.translate.get('FINDING_DEVICES').toPromise();
    this.toast = this.toastCtrl.create({message: message});
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
    this.ipInput = device.address.ipv4;

    this.tryConnect();
  }

  networkConfigurations() {
    cordova.plugins.settings.open(
      "wifi",
      () => {},
      () => console.log('Failed to open network settings')
    );
  }
}
