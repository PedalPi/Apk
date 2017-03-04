import {ApplicationRef} from '@angular/core';

import {DataService} from "../data/data-service";
import {JsonService} from "../json/json-service";
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
    this.connect(WebSocketService.prepareUrl(JsonService.server))
  }

  public connect(url) {
    if (this.connection)
      this.connection.close();

    RobustWebSocket.defaultOptions.shouldReconnect = () => 1500;
    const connection = new RobustWebSocket(url);

    connection.onmessage = m => this.onMessage(m.data);

    connection.onopen = () => {
      if (this.tryingReconnect)
        this.loading.dismiss()

      this.forceReconnection = true;
      this.tryingReconnect = false;
      this.onConnectedListener();

      this.toastCtrl.create({
        message: 'Device connected',
        duration: 3000
      }).present();

      this.connected = true;

      this.data.lastDeviceConnected = url;
    }

    connection.onclose = () => {
      this.connected = false;

      if (!this.forceReconnection || this.tryingReconnect)
        return;

      this.tryingReconnect = true;
      this.loading = this.loadingCtrl.create({content: "Trying reconnect"});
      this.loading.present();
    }

    connection.onerror = (error, asd) => {
      console.log(error);
      this.connected = false;

      this.toastCtrl.create({
        message: 'Connection error',
        duration: 3000
      }).present();

      if (this.loading)
        this.loading.dismiss();

      connection.close();
      this.onErrorListener()
    }

    this.connection = connection;
  }

  static prepareUrl(url) {
    return `${url.replace("http", "ws")}/ws/`;
  }

  clearListeners() {
    this.onErrorListener = () => {};
    this.messageDecoder.clearListeners();
  }

  onMessage(message) {
    message = JSON.parse(message);
    this.messageDecoder.onMessage(message);
  }
}
