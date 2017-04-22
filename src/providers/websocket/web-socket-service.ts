import {DataService} from "../data/data-service";
import {Injectable} from '@angular/core';

import {PedalPiMessageDecoder} from './pedalpi-message-decoder';
import {ConnectionView} from './connection-view';


export interface MessageDecoder {
  onMessage(message : any);
  clearListeners();
}

export enum ConnectionStatus {
  DISCONNECTED, TRYING_RECONNECT, CONNECTED
}

@Injectable()
export class WebSocketService {
  private connection : WebSocket;

  public forceReconnection : boolean;
  private _status : ConnectionStatus;

  public messageDecoder : PedalPiMessageDecoder;
  public onStatusChangedListener = status => {};

  public view : ConnectionView;

  constructor(private data : DataService) {
    this.forceReconnection = false;

    this.messageDecoder = new PedalPiMessageDecoder(data);
    data.addOnReadyListener(() => this.initializeConnection());
  }

  private initializeConnection() {
    this.tryConnect(this.data.lastDeviceConnected);
  }

  public tryConnect(url) {
    this.status = ConnectionStatus.TRYING_RECONNECT;

    if (this.connection != undefined)
      this.connection.close();

    RobustWebSocket.defaultOptions.shouldReconnect = () => 1500;
    const connection = new RobustWebSocket(url);

    connection.onmessage = m => this.onMessage(m.data);

    connection.onopen = () => this.onConnectionOpen(url);
    connection.onclose = () => this.onConnectionClose();
    connection.onerror = error => this.onConnectionError(error, connection);

    this.connection = connection;
  }

  private onMessage(message) {
    message = JSON.parse(message);
    this.messageDecoder.onMessage(message);
  }

  private onConnectionOpen(url) {
    this.status = ConnectionStatus.CONNECTED;
    this.data.lastDeviceConnected = url;
  }

  private onConnectionClose() {
    this.status = ConnectionStatus.DISCONNECTED;

    if (!this.forceReconnection || this.tryingReconnect)
      return;

    this.status = ConnectionStatus.TRYING_RECONNECT;
  }

  private onConnectionError(error, connection) {
    console.log(error);

    connection.close();
    this.status = ConnectionStatus.DISCONNECTED;
  }

  static prepareUrl(url) {
    return `${url.replace("http", "ws")}/ws/`;
  }

  get status() {
    return this._status;
  }

  set status(newStatus : ConnectionStatus) {
    if (this._status == newStatus)
      return

    this._status = newStatus;
    this.onStatusChangedListener(newStatus);

    if (this.view !== undefined)
      this.view.onStatusChanged(newStatus);
  }

  get tryingReconnect() : boolean {
    return this.status == ConnectionStatus.TRYING_RECONNECT;
  }

  get connected() {
    return this.status == ConnectionStatus.CONNECTED;
  }

  clearListeners() {
    this.view.onDataLoaded = () => {};
    this.onStatusChangedListener = status => {};
    this.messageDecoder.clearListeners();
  }
}
