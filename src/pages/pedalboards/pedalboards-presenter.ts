import {JsonService} from '../../providers/json/json-service';

import {PedalboardGenerator} from '../../generator/model-generator';
import {PedalboardService} from '../../providers/json/pedalboard-service';

import {PedalboardsPage} from './pedalboards';

export class PedalboardsPresenter {
  private page : PedalboardsPage;
  public bank : any;
  private jsonService : JsonService;

  constructor(page : PedalboardsPage, bank : any, jsonService : JsonService) {
    this.page = page;
    this.bank = bank;
    this.jsonService = jsonService;
  }

  private get service() : PedalboardService {
    return this.jsonService.pedalboard;
  }

  requestSavePedalboard(data : any) : void {
    const pedalboard = PedalboardGenerator.generate(data.name);
    const savePedalboard = status => this.bank.pedalboards.push(pedalboard);

    this.service.saveNew(this.bank, pedalboard).subscribe(savePedalboard);
  }

  requestDeletePedalboard(pedalboard : any) : void {
    const deletePedalboard = () => {
      const pedalboardIndex = this.bank.pedalboards.indexOf(pedalboard);
      this.bank.pedalboards.splice(pedalboardIndex, 1);
    };

    this.service.delete(this.bank, pedalboard).subscribe(deletePedalboard);
  }

  requestRenamePedalboard(pedalboard : any, data : any) : void {
    pedalboard.name = data.name;
    this.service.update(this.bank, pedalboard).subscribe(() => {});
  }

  reorderItems(from, to) : void {
    const pedalboard = this.bank.pedalboards[from];

    this.bank.pedalboards.splice(from, 1);
    this.bank.pedalboards.splice(to, 0, pedalboard);

    this.service.swap(this.bank, from, to)
        .subscribe(() => {});
  }
}
