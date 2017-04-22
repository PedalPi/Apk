import {Bank} from './model/bank';
import {SystemEffect} from './model/system/system-effect';
import {PersistenceDecoder} from './decoder/persistence-decoder';


export class BanksManager {
  public banks : Bank[] = []

  static SYSTEM_EFFECT = new SystemEffect('system', ['capture_1'], ['playback_1', 'playback_2'])

  static generate(data: any, pluginsData : any) {
    const manager = new BanksManager()
    const decoder = new PersistenceDecoder(BanksManager.SYSTEM_EFFECT, pluginsData);

    for (let bankJson of BanksManager.order(data)) {
      const bank = decoder.read(bankJson)
      bank.manager = manager
      manager.banks.push(bank)
    }

    return manager
  }

  private static order(data) {
    const banks = Object.keys(data.banks).map(key => data.banks[key])
    return banks.sort((b1, b2) => b1.index - b2.index)
  }

  json() {
    return {
      'banks': this.banks.map(bank => bank.json())
    }
  }
}
