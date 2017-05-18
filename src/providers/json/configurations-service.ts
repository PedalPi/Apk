import {Rest} from './rest';
import {Router} from './router';


export class ConfigurationsService {
  private rest : Rest;
  private router : Router;

  constructor(rest : Rest, router : Router) {
    this.rest = rest;
    this.router = router;
  }

  private url() : string {
    return this.router.route('/configurations/device_name');
  }

  public getDeviceName() {
    return this.rest.get(this.url());
  }
}
