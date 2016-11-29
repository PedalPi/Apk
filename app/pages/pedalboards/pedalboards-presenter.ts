import {JsonService} from '../../service/json/json-service';

import {PedalboardGenerator} from '../../generator/modelGenerator';
import {PedalboardService} from '../../service/json/pedalboard-service';
import {BanksService} from '../../service/json/banks-service';

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

  private get banksService() : BanksService {
    return this.jsonService.banks;
  }

  requestSavePedalboard(data : any) : void {
    const pedalboard = PedalboardGenerator.generate(data.name);
    const savePedalboard = status => this.bank.pedalboards.push(pedalboard);

    this.service.saveNewPedalboard(this.bank, pedalboard).subscribe(savePedalboard);
  }

  requestDeletePedalboard(pedalboard : any) : void {
    const deletePedalboard = () => {
      const pedalboardIndex = this.bank.pedalboards.indexOf(pedalboard);
      this.bank.pedalboards.splice(pedalboardIndex, 1);
    };

    this.service.deletePedalboard(this.bank, pedalboard).subscribe(deletePedalboard);
  }

  requestRenamePedalboard(pedalboard : any, data : any) : void {
    pedalboard.name = data.name;
    this.service.updatePedalboard(this.bank, pedalboard).subscribe(() => {});
  }

  reorderItems(from, to) : void {
    const pedalboard = this.bank.pedalboards[from];

    this.bank.pedalboards.splice(from, 1);
    this.bank.pedalboards.splice(to, 0, pedalboard);

    this.banksService.swapPedalboards(this.bank, from, to)
        .subscribe(() => {});
  }
}
