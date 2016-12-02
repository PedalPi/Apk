import {ApplicationRef} from '@angular/core';

import {DataService} from "../data/data-service";
import {JsonService} from "../json/json-service";
import {Injectable} from '@angular/core';

import {ModelUtil} from '../../util/model-util';
import {ToastController, LoadingController} from 'ionic-angular';


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

  constructor(data : DataService, ref: ApplicationRef, loadingCtrl: LoadingController) {
    this.loadingCtrl = loadingCtrl;
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
    }

    connection.onclose = () => {
      if (!this.forceReconnection || this.tryingReconnect)
        return;

      this.tryingReconnect = true;
      this.loading = this.loadingCtrl.create({content: "Trying reconnect"});
      this.loading.present();
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
    message = JSON.parse(message);
    console.log(message);

    if (!this.data.hasObtainedRemote())
      return;

    const type = message["type"];

    if (type == 'CURRENT')
      this.onCurrentPedalboardChange(message);
    else if (type == 'BANK')
      this.onBankCUD(message);
    else if (type == 'PATCH')
      this.onPedalboardCUD(message);
    else if (type == 'EFFECT')
      this.onEffectCUDListener(message);
    else if (type == 'EFFECT-TOGGLE')
      this.onEffectStatusToggled(message);
    else if (type == 'PARAM')
      this.onParamValueChange(message);
    else if (type == 'TOKEN')
      JsonService.token = message.value;
  }

  private onCurrentPedalboardChange(message : any) {
    const bank = this.bankBy(message);
    const pedalboard = this.pedalboardBy(message);

    this.onCurrentPedalboardChangeListener(bank, pedalboard);
  }

  private onBankCUD(message : any) {
    const banks = this.data.remote.banks;
    let bankListIndex = ModelUtil.getBankListIndex(banks, message.bank);

    if (message.updateType == "UPDATED") {
      banks[bankListIndex] = message.value;
    } else if (message.updateType == "DELETED")
      banks.splice(bankListIndex, 1);
    else if (message.updateType == "CREATED")
      banks.push(message.value);

    this.onBankCUDListener(message, message.value);

    this.ref.tick();
  }

  private onPedalboardCUD(message : any) {
    const bank = this.bankBy(message);
    if (message.updateType == "UPDATED")
      bank.pedalboards[message.pedalboard] = message.value;
    else if (message.updateType == "DELETED")
      bank.pedalboards.splice(message.pedalboard, 1);
    else if (message.updateType == "CREATED")
      bank.pedalboards.push(message.value);

    this.onPedalboardCUDListener(message, message.value);

    this.ref.tick();
  }

  private onEffectStatusToggled(message : any) {
    const effect = this.effectBy(message);
    effect.status = !effect.status;

    this.onEffectStatusToggledListener(message);
  }

  private onParamValueChange(message : any) {
    const param = this.paramBy(message);
    param.value = message.value;

    this.onParamValueChangeListener(message);
  }

  private bankBy(message) : any {
    return ModelUtil.getBank(this.data.remote.banks, message.bank);
  }

  private pedalboardBy(message) {
    const bank = this.bankBy(message);
    return bank.pedalboards[message.pedalboard];
  }

  private effectBy(message) {
    const pedalboard = this.pedalboardBy(message);
    return pedalboard.effects[message.effect];
  }

  private paramBy(message) {
    const effect = this.effectBy(message);
    return effect.plugin.ports.control.input[message.param];
  }
}
