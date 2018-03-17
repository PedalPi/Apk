import {Rest} from './rest';
import {Router} from './router';


export class JsonBaseService {
  private rest : Rest;
  private router : Router;

  constructor(rest : Rest, router : Router) {
    this.rest = rest;
    this.router = router;
  }
  
  protected get(url : string) {
    url = this.router.route(url)
    return this.rest.get(url)
  }

  protected post(url : string, data : any) {
    url = this.router.route(url)
    return this.rest.post(url, data)
  }

  protected put(url : string, data? : any) {
    url = this.router.route(url)
    return this.rest.put(url, data)
  }

  protected delete(url : string) {
    url = this.router.route(url)
    return this.rest.delete(url)
  }
}