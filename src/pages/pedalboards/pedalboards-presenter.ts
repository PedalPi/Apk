import {JsonService} from '../../providers/json/json-service';

import {PedalboardsPage} from './pedalboards';
import {Bank} from '../../plugins-manager/model/bank';
import {BanksManager} from '../../plugins-manager/banks-manager';
import {Pedalboard} from '../../plugins-manager/model/pedalboard';
import {Connection} from '../../plugins-manager/model/connection';
import {PedalboardService} from '../../providers/json/pedalboard-service';


export class PedalboardsPresenter {
  private page : PedalboardsPage;
  public bank : Bank;
  private jsonService : JsonService;

  constructor(page : PedalboardsPage, bank : Bank, jsonService : JsonService) {
    this.page = page;
    this.bank = bank;
    this.jsonService = jsonService;
  }

  private get service() : PedalboardService {
    return this.jsonService.pedalboard;
  }

  requestSaveNewPedalboard(data : any) : void {
    const pedalboard = this.createDefaultPedalboard(data.name);
    pedalboard.bank = this.bank;
    const savePedalboard = status => this.bank.pedalboards.push(pedalboard);

    this.service.saveNew(pedalboard).subscribe(savePedalboard);
  }

  private createDefaultPedalboard(name : string) : Pedalboard {
    const output = BanksManager.SYSTEM_EFFECT.outputs[0];
    const input = BanksManager.SYSTEM_EFFECT.inputs[0];

    const connection = new Connection(output, input);

    const pedalboard = new Pedalboard(name);
    pedalboard.connections.push(connection);

    return pedalboard;
  }

  requestDeletePedalboard(pedalboard : Pedalboard) : void {
    const deletePedalboard = () => {
      const pedalboardIndex = this.bank.pedalboards.indexOf(pedalboard);
      this.bank.pedalboards.splice(pedalboardIndex, 1);
    };

    this.service.delete(pedalboard).subscribe(deletePedalboard);
  }

  requestRenamePedalboard(pedalboard : Pedalboard, data : any) : void {
    pedalboard.name = data.name;
    this.service.update(pedalboard).subscribe(() => {});
  }

  reorderItems(from, to) : void {
    const pedalboard = this.bank.pedalboards[from];

    this.bank.pedalboards.splice(from, 1);
    this.bank.pedalboards.splice(to, 0, pedalboard);

    this.service.swap(this.bank, from, to)
        .subscribe(() => {});
  }
}
