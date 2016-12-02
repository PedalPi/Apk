import {JsonService} from './json-service';

export class Router {
  
  route(address : string) {
    return JsonService.server + address;
  }
}
