import {Http, Headers, RequestOptions} from '@angular/http';


export class RestService {
  private http : Http;

  constructor(http : Http) {
    this.http = http;
  }

  get(url : string) {
    const headers = new Headers({ 'Access-Control-Allow-Origin': '*' });
    const options = new RequestOptions({ headers: headers });

    return this.http.get(url, options)
      .map(res => res.json());
      //.catch(this.handleError);
  }

  post(url : string, data : any) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    const body = JSON.stringify(data);

    return this.http.post(url, body, options)
      .map(res => res.json());
      //.catch(this.handleError);
  }

  put(url : string, data : any) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    const body = JSON.stringify(data);

    return this.http.put(url, body, options)
      .map(res => res.json());
      //.catch(this.handleError);
  }

  delete(url : string) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.delete(url, options)
      .map(res => res.json());
      //.catch(this.handleError);
  }

  private handleError(error) {
    console.error(error);
    return {subscribe: () => {}};

    //return Observable.throw(error.json().error || 'Server error');
  }
}
