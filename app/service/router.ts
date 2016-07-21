export class Router {
  public server : string;

  constructor(server : string) {
    this.server = server;
  }

  route(address : string) {
    return this.server + address;
  }
}
