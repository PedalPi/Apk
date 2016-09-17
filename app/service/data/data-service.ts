import {Injectable} from '@angular/core';


@Injectable()
export class DataService {
  private serverData : any = null;
  public local : any = {};

  public get server() {
    return this.hasObtainedServer() ? this.serverData : {};
  }

  public hasObtainedServer() {
    return this.serverData !== null;
  }

  public set server(data) {
    this.serverData = data;
  }
}
