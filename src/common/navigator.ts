import {NavController} from 'ionic-angular';


export class Navigator {
  constructor(private nav: NavController) {}

  public push(page, parameters, options?) {
    const goTo = (resolve, reject) => {
      parameters['resolve'] = resolve;
      parameters['reject'] = resolve;
      this.nav.push(page, parameters, options);

      return true;
    }

    return new NavigatorResult(goTo);
  }
}

export class NavigatorResult {
  constructor(private goTo) {}

  public thenBackSucess(callback : (...args: any[]) => boolean) {
    new Promise(this.goTo).then(callback);
  }
}
