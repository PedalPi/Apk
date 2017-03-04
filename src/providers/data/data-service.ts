import {Injectable} from '@angular/core';

import {Storage} from '@ionic/storage';


@Injectable()
export class DataService {
  public static get PEDALBOARD_KEY() { return 'pedalpi-apk' };
  private static LAST_DEVICE = 'LAST_DEVICE'

  public remote : any = {
    manager: null,
    plugins: null
  };

  public local : any = {};

  private _lastDeviceConnected;

  private onReadyListeners : Array<() => void> = [];

  constructor(private storage: Storage) {
    this.storage.ready()
        .then(() => this.storage.get(DataService.LAST_DEVICE))
        .then(data => this._lastDeviceConnected = data)
        .then(() => this.onReadyListeners.forEach(listener => listener()));
  }

  public hasObtainedRemote() {
    return this.remote.manager !== null;
  }

  updatePlugins(plugins) {
    const data = {};
    for (let plugin of plugins)
      data[plugin['uri']] = plugin;

    this.remote.plugins = data;
  }

  get lastDeviceConnected() {
    return this._lastDeviceConnected;
  }

  set lastDeviceConnected(device) {
    this.storage.ready().then(() => this.storage.set(DataService.LAST_DEVICE, device));

    this._lastDeviceConnected = device;
  }

  addOnReadyListener(listener : () => void) {
    this.onReadyListeners.push(listener);
  }
}
