import {Http} from '@angular/http';


export class RestService {
  private http : Http;

  constructor(http : Http) {
    this.http = http;
  }

  get(url) {
    return this.http.get(url)
      .map(res => res.json());
      //.catch(this.handleError);
  }

  post(url, data) {
    return this.http.post(url, data)
      .map(res => res.json());
      //.catch(this.handleError);
  }

  put(url, data) {
    return this.http.put(url, data)
      .map(res => res.json());
      //.catch(this.handleError);
  }

  delete(url, data) {
    return this.http.delete(url, data)
      .map(res => res.json());
      //.catch(this.handleError);
  }
}
