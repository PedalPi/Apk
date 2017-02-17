import {Injectable} from '@angular/core';


@Injectable()
export class DataService {
  public static get PEDALBOARD_KEY() { return 'pedalpi-apk' };

  public remote : any = {
    manager: null
  };

  public local : any = {};

  public hasObtainedRemote() {
    return this.remote.manager !== null;
  }
}
