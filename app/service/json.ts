import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

const server = 'http://trick-group-3000.codio.io';
class Router {
  public effects : String;
  public banks : String;

  constructor(server : String) {
    this.effects = server + '/effects';
    this.banks = server + '/banks';
  }
}

@Injectable()
export class JsonService {
  private http : Http;
  private router : Router;

  constructor(http : Http) {
    this.http = http;
    this.router = new Router(server);
  }

  get(url) {
    return this.http.get(url)
      .map(res => res.json());
      //.catch(this.handleError);
  }

  requestBanks() {
    return this.get(this.router.banks);
  }

  handleError(error) {
    console.error(error);
    return {subscribe: () => {}};

    //return Observable.throw(error.json().error || 'Server error');
  }
}
