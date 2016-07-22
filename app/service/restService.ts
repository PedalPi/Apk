import {Http, Headers, RequestOptions} from '@angular/http';


export class RestService {
  private http : Http;

  constructor(http : Http) {
    this.http = http;
  }

  private get headers() : any {
    const headers = new Headers();
    return new RequestOptions({'headers' : headers});
  }

  private processResponse(res) {
    return res.text().length == 0 ? res.text() : res.json();
  }

  get(url : string) {
    return this.http.get(url)
      .map(this.processResponse);
      //.catch(this.handleError);
  }

  post(url : string, data : any) {
    const body = JSON.stringify(data);

    return this.http.post(url, body, this.headers)
      .map(this.processResponse);
      //.catch(this.handleError);
  }

  put(url : string, data : any) {
    const body = JSON.stringify(data);

    return this.http.put(url, body, this.headers)
      .map(this.processResponse);
      //.catch(this.handleError);
  }

  delete(url : string) {
    return this.http.delete(url, this.headers)
      .map(this.processResponse);
      //.catch(this.handleError);
  }

  private handleError(error) {
    console.error(error);
    return {subscribe: () => {}};

    //return Observable.throw(error.json().error || 'Server error');
  }
}
