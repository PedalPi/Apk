import {ApplicationRef} from '@angular/core';

import {DataService} from "../data/data-service";
import {JsonService} from "../json/json-service";
import {Injectable} from '@angular/core';

import {ModelUtil} from '../../util/model-util';
import {ToastController, LoadingController} from 'ionic-angular';

declare var RobustWebSocket: any;

@Injectable()
export class WebSocketService {
  private data : DataService;
  private ref: ApplicationRef;

  private connection : WebSocket;

  public onCurrentPatchChangeListener : any;

  public onBankCUDListener : any;
  public onPatchCUDListener : any;
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
    this.onCurrentPatchChangeListener = () => {};

    this.onBankCUDListener = () => {};
    this.onPatchCUDListener = () => {};
    this.onEffectCUDListener = () => {};

    this.onEffectStatusToggledListener = () => {};
    this.onParamValueChangeListener = () => {};
  }

  onMessage(message) {
    message = JSON.parse(message);
    console.log(message);

    if (!this.data.hasObtainedServer())
      return;

    const type = message["type"];

    if (type == 'CURRENT')
      this.onCurrentPatchChange(message);
    else if (type == 'BANK')
      this.onBankCUD(message);
    else if (type == 'PATCH')
      this.onPatchCUD(message);
    else if (type == 'EFFECT')
      this.onEffectCUDListener(message);
    else if (type == 'EFFECT-TOGGLE')
      this.onEffectStatusToggled(message);
    else if (type == 'PARAM')
      this.onParamValueChange(message);
    else if (type == 'TOKEN')
      JsonService.token = message.value;
  }

  private onCurrentPatchChange(message : any) {
    const bank = this.bankBy(message);
    const patch = this.patchBy(message);

    this.onCurrentPatchChangeListener(bank, patch);
  }

  private onBankCUD(message : any) {
    const banks = this.data.server.banks;
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

  private onPatchCUD(message : any) {
    const bank = this.bankBy(message);
    if (message.updateType == "UPDATED")
      bank.patches[message.patch] = message.value;
    else if (message.updateType == "DELETED")
      bank.patches.splice(message.patch, 1);
    else if (message.updateType == "CREATED")
      bank.patches.push(message.value);

    this.onPatchCUDListener(message, message.value);

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
    return ModelUtil.getBank(this.data.server.banks, message.bank);
  }

  private patchBy(message) {
    const bank = this.bankBy(message);
    return bank.patches[message.patch];
  }

  private effectBy(message) {
    const patch = this.patchBy(message);
    return patch.effects[message.effect];
  }

  private paramBy(message) {
    const effect = this.effectBy(message);
    return effect.ports.control.input[message.param];
  }
}
