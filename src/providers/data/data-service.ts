import {Injectable} from '@angular/core';


@Injectable()
export class DataService {
  public static get PEDALBOARD_KEY() { return 'pedalpi-apk' };

  public remote : any = {
    manager: null,
    plugins: null
  };

  public local : any = {};

  public hasObtainedRemote() {
    return this.remote.manager !== null;
  }

  updatePlugins(plugins) {
    const data = {};
    for (let plugin of plugins)
      data[plugin['uri']] = plugin;

    this.remote.plugins = data;
  }
}
