import {ApplicationRef} from '@angular/core';

import {DataService} from "../data/data-service";
import {JsonService} from "../json/json-service";
import {Injectable} from '@angular/core';


@Injectable()
export class WebSocketService {
  public static url = 'ws://localhost:3000/ws/';

  private data : DataService;
  private ref: ApplicationRef;

  private connection : any;

  public onCurrentPatchChangeListener : any;

  public onBankCUDListener : any;
  public onPatchCUDListener : any;
  public onEffectCUDListener : any;

  public onEffectStatusToggledListener : any;
  public onParamValueChangeListener : any;

  constructor(data : DataService, ref: ApplicationRef) {
    this.data = data;
    this.ref = ref;
    this.connection = new WebSocket(WebSocketService.url);

    //this.connection.onopen = () => alert('Ping');
    this.connection.onerror = error => console.log('WebSocket Error ' + error);
    this.connection.onmessage = e => this.onMessage(e.data);

    this.clearListeners();
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
      this.onBankCUDListener(message);
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

    //this.ref.tick();
  }

  private onCurrentPatchChange(message : any) {
    const patch = this.patchBy(message);

    this.onCurrentPatchChangeListener(patch);
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

  private bankBy(message) {
    return this.data.server.banks[message.bank];
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
