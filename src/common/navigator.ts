import {App, NavParams} from 'ionic-angular';
import {Injectable} from '@angular/core';


@Injectable()
export class Navigator {
  constructor(private app: App) {}

  public push(page, parameters, options?) {
    const goTo = (resolve, reject) => {
      parameters['resolve'] = resolve;
      parameters['reject'] = resolve;
      this.nav.push(page, parameters, options);

      return true;
    }

    return new NavigatorResult(goTo);
  }

  private get nav() {
    return this.app.getActiveNav();
  }

  public callBackSucess(navParams : NavParams, params) {
    const callback = navParams.get('resolve')

    if (callback)
      return callback(params)

    return true;
  }

  private get beforePage() {
    return this.nav.getPrevious(this.nav.getActive()).instance;
  }
}

export class NavigatorResult {
  constructor(private goTo) {}

  public thenBackSucess(callback : (params : any) => boolean) {
    new Promise(this.goTo).then(callback);
  }
}
