import {ApplicationRef} from '@angular/core';

import {DataService} from "../data/data-service";
import {JsonService} from "../json/json-service";
import {Injectable} from '@angular/core';

import {ToastController, LoadingController} from 'ionic-angular';

import {Bank} from '../../plugins-manager/model/bank';

import {PedalPiMessageDecoder} from './pedalpi-message-decoder';


@Injectable()
export class WebSocketService {
  private data : DataService;
  private ref: ApplicationRef;

  private connection : WebSocket;

  public onCurrentPedalboardChangeListener : any;

  public onBankCUDListener : any;
  public onPedalboardCUDListener : any;
  public onEffectCUDListener : any;

  public onEffectStatusToggledListener : any;
  public onParamValueChangeListener : any;

  public onConnectedListener : any = () => {};

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

    this.connect(WebSocketService.prepareUrl(JsonService.server));
    this.clearListeners();
  }

  public connect(url) {
    if (this.connection)
      this.connection.close();

    RobustWebSocket.defaultOptions.shouldReconnect = () => 1500;
    const connection = new RobustWebSocket(url);

    connection.onmessage = m => this.onMessage(m.data);
    connection.onerror = console.error;

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
    }

    this.connection = connection;
  }

  static prepareUrl(url) {
    return `${url.replace("http", "ws")}/ws/`;
  }

  clearListeners() {
    this.onCurrentPedalboardChangeListener = () => {};

    this.onBankCUDListener = () => {};
    this.onPedalboardCUDListener = () => {};
    this.onEffectCUDListener = () => {};

    this.onEffectStatusToggledListener = () => {};
    this.onParamValueChangeListener = () => {};
  }

  onMessage(message) {
    new PedalPiMessageDecoder(this.data).onMessage(message);

    message = JSON.parse(message);
    console.log(message);

    const type = message["type"];

    if (type == 'TOKEN')
      JsonService.token = message.value;

    if (!this.data.hasObtainedRemote())
      return;

    if (type == 'EFFECT')
      this.onEffectCUDListener(message);
  }

  private onCurrentPedalboardChange(message : any) {
    const bank = this.bankBy(message);
    const pedalboard = this.pedalboardBy(message);

    this.onCurrentPedalboardChangeListener(bank, pedalboard);
  }

  private bankBy(message) : Bank {
    return this.data.remote.manager.banks[message.bank]
  }

  private pedalboardBy(message) {
    const bank = this.bankBy(message);
    return bank.pedalboards[message.pedalboard];
  }
}
