import {DataService} from '../../providers/data/data-service';
import {JsonService} from '../../providers/json/json-service';
import {BanksService} from '../../providers/json/banks-service';

import {Bank} from '../../plugins-manager/model/bank';
import {Pedalboard} from '../../plugins-manager/model/pedalboard';

import {BanksPage} from './banks';


export class BanksPresenter {
  private jsonService : JsonService;
  private page : BanksPage;
  private data : DataService;

  constructor(page : BanksPage, jsonService : JsonService, data : DataService) {
    this.page = page;
    this.jsonService = jsonService;
    this.data = data;
  }

  private get service() : BanksService {
    return this.jsonService.banks;
  }

  get banks() {
    return this.manager.banks;
  }

  get manager() {
    return this.data.remote.manager;
  }

  requestSaveBank(data: any) : void {
    const bank = new Bank(data.name);
    bank.manager = this.data.remote.manager;

    const pedalboard = new Pedalboard('Empty pedalboard');
    pedalboard.bank = bank;
    bank.pedalboards.push(pedalboard);

    const saveBank = status => this.manager.banks.push(bank);

    this.service.saveNew(bank).subscribe(saveBank);
  }

  requestRenameBank(bank : any, data: any) : void {
    bank.name = data.name;

    this.service.update(bank).subscribe(() => {});
  }

  requestDeleteBank(bank : any) : void {
    const deleteBank = () => this.banks.splice(this.banks.indexOf(bank), 1);

    this.service.delete(bank).subscribe(deleteBank);
  }

  reorderItems(from, to) : void {
    let bank = this.banks[from];

    this.banks.splice(from, 1);
    this.banks.splice(to, 0, bank);

    const bankA = this.banks[from];
    const bankB = this.banks[to];

    const indexA = bankA.index;
    const indexB = bankB.index;

    this.service.swap(bankA, bankB)
        .subscribe(() => {
          bankA.index = indexB
          bankB.index = indexA
        });
  }
}
