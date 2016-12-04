import {BankGenerator} from '../../generator/model-generator';

import {DataService} from '../../providers/data/data-service';
import {JsonService} from '../../providers/json/json-service';
import {BanksService} from '../../providers/json/banks-service';

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
    return this.data.remote.banks;
  }

  bankIndex(bank) {
    return this.banks.indexOf(bank);
  }

  requestSaveBank(data: any) : void {
    const bank = BankGenerator.generate(data.name);
    const saveBank = status => {
      bank.index = status.index;
      this.banks.push(bank);
    }

    this.service.saveNew(bank).subscribe(saveBank);
  }

  requestRenameBank(bank : any, data: any) : void {
    bank.name = data.name;

    this.service.update(bank, this.bankIndex(bank)).subscribe(() => {});
  }

  requestDeleteBank(bank : any) : void {
    const deleteBank = () => this.banks.splice(this.banks.indexOf(bank), 1);

    this.service.delete(this.bankIndex(bank)).subscribe(deleteBank);
  }

  reorderItems(from, to) : void {
    let bank = this.banks[from];

    this.banks.splice(from, 1);
    this.banks.splice(to, 0, bank);

    const bankA = this.banks[from];
    const bankB = this.banks[to];

    const indexA = this.bankIndex(bankA);
    const indexB = this.bankIndex(bankB);

    this.service.swap(indexA, indexB)
        .subscribe(() => {
          bankA.index = indexB
          bankB.index = indexA
        });
  }
}
