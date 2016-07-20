export class Router {
  public server : string;

  public effects : string;
  public banks : string;
  public bank : string;

  constructor(server : string) {
    this.server = server;

    this.effects = this.route('/effects');
    this.banks = this.route('/banks');
    this.bank = this.route('/bank');
  }

  route(address : string) {
    return this.server + address;
  }
}
