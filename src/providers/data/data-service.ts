import {Injectable} from '@angular/core';

import {Storage} from '@ionic/storage';


@Injectable()
export class DataService {
  public static get PEDALBOARD_KEY() { return 'pedalpi-apk' };

  private static KEYS = {
    LAST_DEVICE: 'LAST_DEVICE',
    LANGUAGE: 'LANGUAGE'
  }

  public remote : any = {
    manager: null,
    plugins: null
  };

  private configurations = {
    lastDeviceConnected: undefined,
    language: undefined
  }

  public local : any = {};

  private onReadyListeners : Array<() => void> = [];

  constructor(private storage: Storage) {
    this.loadDatabase();
  }

  private async loadDatabase() {
    await this.storage.ready();
    this.configurations.lastDeviceConnected = await this.read(DataService.KEYS.LAST_DEVICE, 'http://pedalpi.local');
    this.configurations.language = await this.read(DataService.KEYS.LANGUAGE, 'en');

    console.log("loaded")
    this.onReadyListeners.forEach(listener => listener());
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
    return this.configurations.lastDeviceConnected;
  }

  set lastDeviceConnected(device) {
    this.storage.ready()
        .then(() => this.write(DataService.KEYS.LAST_DEVICE, device));

    this.configurations.lastDeviceConnected = device;
  }

  get language() {
    return this.configurations.language;
  }

  set language(language : string) {
    this.storage.ready()
        .then(() => this.write(DataService.KEYS.LAST_DEVICE, language));

    this.configurations.language = language;
  }

  public addOnReadyListener(listener : () => void) {
    this.onReadyListeners.push(listener);
  }

  ////////////////////
  private async read(key : string, defaultValue : any = undefined) {
    let value = await this.storage.get(key)
    return Promise.resolve(value == undefined ? defaultValue : value);
  }

  private write(key : string, value : any) {
    return this.storage.set(key, value)
  }
}
