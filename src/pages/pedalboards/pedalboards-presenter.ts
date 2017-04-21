import {JsonService} from '../../providers/json/json-service';

import {PedalboardsPage} from './pedalboards';
import {Bank} from '../../plugins-manager/model/bank';
import {Default} from '../../plugins-manager/default';
import {Pedalboard} from '../../plugins-manager/model/pedalboard';
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

  requestSaveNewPedalboard(data : any, callback : any) : void {
    const pedalboard = this.createDefaultPedalboard(data.name);
    pedalboard.bank = this.bank;
    const savePedalboard = status => {
      this.bank.pedalboards.push(pedalboard);
      callback(pedalboard);
    }

    this.service.saveNew(pedalboard).subscribe(savePedalboard);
  }

  private createDefaultPedalboard(name : string) : Pedalboard {
    return Default.defaultPedalboard(name);
  }

  requestDeletePedalboard(pedalboard : Pedalboard) : void {
    const deletePedalboard = () => {
      const pedalboardIndex = this.bank.pedalboards.indexOf(pedalboard);
      this.bank.pedalboards.splice(pedalboardIndex, 1);
    };

    this.service.delete(pedalboard).subscribe(deletePedalboard);
  }

  requestRenamePedalboard(pedalboard : Pedalboard, newName : string) : void {
    pedalboard.name = newName;
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
