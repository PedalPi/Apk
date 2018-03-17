import {Headers, RequestOptions} from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JsonService} from './json-service';


export class Rest {
  private http : HttpClient;

  constructor(http : HttpClient) {
    this.http = http;
  }

  private get headers() : any {
    let headers = new HttpHeaders();

    if (JsonService.token != null)
      headers = headers.set('Authorization', `bearer ${JsonService.token}`);

    return {'headers': headers};
  }

  private processResponse(res) {
    return res;
  }

  get(url : string) {
    return this.http.get(url, this.headers)
      .map(this.processResponse);
      //.catch(this.handleError);
  }

  post(url : string, data : any) {
    const body = JSON.stringify(data);

    return this.http.post(url, body, this.headers)
      .map(this.processResponse);
      //.catch(this.handleError);
  }

  put(url : string, data? : any) {
    const body = data !== undefined ? JSON.stringify(data) : null;

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
