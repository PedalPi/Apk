import {JsonService} from "../json-service";
import {Injectable} from '@angular/core';

export class WebSocketService {
  public static url = 'ws://localhost:3000/ws/';
  public static ws : WebSocketService = new WebSocketService();

  private connection : any;

  public onCurrentPatchChangeListener : any = () => {};

  public onBankCUDListener : any = () => {};
  public onPatchCUDListener : any = () => {};
  public onEffectCUDListener : any = () => {};

  public onEffectStatusToggledListener : any = () => {};
  public onParamValueChangeListener : any = () => {};

  constructor() {
    this.connection = new WebSocket(WebSocketService.url);

    //this.connection.onopen = () => alert('Ping');
    this.connection.onerror = error => console.log('WebSocket Error ' + error);
    this.connection.onmessage = e => this.onMessage(e.data);
  }

  onMessage(message) {
    message = JSON.parse(message);
    console.log(message);

    const type = message["type"];

    if (type == 'CURRENT')
      this.onCurrentPatchChangeListener(message);
    else if (type == 'BANK')
      this.onBankCUDListener(message);
    else if (type == 'PATCH')
      this.onPatchCUDListener(message);
    else if (type == 'EFFECT')
      this.onEffectCUDListener(message);
    else if (type == 'EFFECT-TOGGLE')
      this.onEffectStatusToggledListener(message);
    else if (type == 'PARAM')
      this.onParamValueChangeListener(message);
    else if (type == 'TOKEN')
      JsonService.token = message.value;
  }
}
