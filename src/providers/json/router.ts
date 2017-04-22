import {JsonService} from './json-service';

export class Router {

  constructor(private jsonService : JsonService) {}

  route(address : string) {
    return `${this.jsonService.webServer}/${JsonService.CURRENT_VERSION}${address}`;
  }
}
