export class Zeroconf {
  public static get TIME() { return 30000; }
  public onDiscoveredListener = (device : Device) => {};
  public onEndDiscoverListener = () => {};

  constructor(public type : string, public domain : string) {}

  get zeroconf() {
    return (<any> window).cordova.plugins.zeroconf;
  }

  hostname(callback) {
    this.zeroconf.getHostname(
      hostname => callback(hostname),
      error => console.log(error)
    );
  }

  discover() {
    setTimeout(() => {
      this.stopDiscover()
      this.onEndDiscoverListener()
    }, Zeroconf.TIME);

    this.zeroconf.watch(
      this.type,
      this.domain,
      result => {
        console.log(result);
        if (result.action && result.service.ipv4Addresses.length > 0)
          this.onDiscoveredListener(new Device(result.service));
      }
    );
  }

  stopDiscover() {
    this.zeroconf.unwatch(this.type, this.domain);
  }
}

export class Device {
  public address: { port: number, ipv4: string; ipv6: string; };
  public hostname: string;
  public name: string;

  constructor(data) {
    this.name = data.name;
    this.hostname = data.hostname;
    this.address = {
      port: data.port,
      ipv4: data.ipv4Addresses[0],
      ipv6: data.ipv6Addresses[0]
    };
  }

  equals(device : Device) {
    return this.name == device.name
        && this.hostname == this.hostname;
  }
}
