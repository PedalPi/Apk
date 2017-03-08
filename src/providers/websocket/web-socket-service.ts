import {ApplicationRef} from '@angular/core';

import {DataService} from "../data/data-service";
import {Injectable} from '@angular/core';

import {ToastController, LoadingController} from 'ionic-angular';

import {PedalPiMessageDecoder} from './pedalpi-message-decoder';


export interface MessageDecoder {
  onMessage(message : any);
  clearListeners();
}

@Injectable()
export class WebSocketService {
  private data : DataService;
  private ref: ApplicationRef;

  private connection : WebSocket;

  public messageDecoder : any;

  public onConnectedListener : any = () => {};
  public onErrorListener : any = () => {};

  public forceReconnection : boolean;
  private tryingReconnect : boolean;
  private loading: any;

  private loadingCtrl : LoadingController;
  private toastCtrl : ToastController;

  public connected : boolean;

  constructor(data : DataService, ref: ApplicationRef, loadingCtrl: LoadingController, toastCtrl : ToastController) {
    this.connected = false;

    this.loadingCtrl = loadingCtrl;
    this.toastCtrl = toastCtrl;
    this.forceReconnection = false;
    this.tryingReconnect = false;

    this.data = data;
    this.ref = ref;

    data.addOnReadyListener(() => this.initializeConnection());
    this.messageDecoder = new PedalPiMessageDecoder(this.data);
    this.clearListeners();
  }

  private initializeConnection() {
    this.tryConnect(this.data.lastDeviceConnected);
  }

  public tryConnect(url) {
    this.connect(url)
        .then(() => this.onConnectedListener())
        .catch(() => this.onErrorListener());
  }

  private connect(url) : Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.connection)
        this.connection.close();

      RobustWebSocket.defaultOptions.shouldReconnect = () => 1500;
      const connection = new RobustWebSocket(url);

      connection.onmessage = m => this.onMessage(m.data);

      connection.onopen = this.onConnectionOpen(resolve, url);
      connection.onclose = this.onConnectionClose()
      connection.onerror = this.onConnectionError(connection, reject);

      this.connection = connection;
    });
  }

  private onMessage(message) {
    message = JSON.parse(message);
    this.messageDecoder.onMessage(message);
  }

  private onConnectionOpen(resolve, url) {
    return () => {
      if (this.tryingReconnect)
        this.loading.dismiss()

      this.forceReconnection = true;
      this.tryingReconnect = false;

      this.showToast('Device connected');

      this.connected = true;
      this.data.lastDeviceConnected = url;
      resolve();
    }
  }

  private onConnectionClose() {
    return () => {
      this.connected = false;

      if (!this.forceReconnection || this.tryingReconnect)
        return;

      this.tryingReconnect = true;
      this.loading = this.loadingCtrl.create({content: "Trying reconnect"});
      this.loading.present();
    }
  }

  private onConnectionError(connection, reject) {
    return (error) => {
      console.log(error);
      this.connected = false;

      this.showToast('Connection error');

      if (this.loading)
        this.loading.dismiss();

      connection.close();
      reject();
    }
  }

  private showToast(message, duration=3000) {
    this.toastCtrl.create({
      message: message,
      duration: duration
    }).present();
  }

  static prepareUrl(url) {
    return `${url.replace("http", "ws")}/ws/`;
  }

  clearListeners() {
    this.onErrorListener = () => {};
    this.messageDecoder.clearListeners();
  }
}
