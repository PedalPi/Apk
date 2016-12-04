import {Injectable} from '@angular/core';
import { ModelUtil } from '../../util/model-util';

@Injectable()
export class DataService {
  private data : any = null;
  public local : any = {};

  public get remote() {
    return this.hasObtainedRemote() ? this.data : {};
  }

  public hasObtainedRemote() {
    return this.data !== null;
  }

  public set remote(data) {
    this.data = this.prepareData(data);
  }

  private prepareData(data) {
    for (let bankKey in data.banks) {
      for (let pedalboard of data.banks[bankKey].pedalboards) {
        for (let i=0; i<pedalboard['effects'].length; i++) {
          let effect = pedalboard['effects'][i];

          pedalboard['effects'][i] = ModelUtil.processEffect(effect);
        }
      }
    }

    let banks = Object.keys(data.banks).map(key => data.banks[key]);
    data.banks = banks.sort((b1, b2) => b1.index - b2.index);
    return data;
  }
}
