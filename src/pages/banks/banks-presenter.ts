import {BankGenerator} from '../../generator/modelGenerator';

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
    let banks = this.data.remote.banks;
    if (banks == null)
     return null;

    banks = Object.keys(banks).map(key => banks[key]);
    return banks.sort((b1, b2) => b1.index - b2.index);
  }

  requestSaveBank(data: any) : void {
    const bank = BankGenerator.generate(data.name);
    const saveBank = status => {
      bank.index = status.index;
      this.banks.push(bank);
    }

    this.service.saveNewBank(bank).subscribe(saveBank);
  }

  requestRenameBank(bank : any, data: any) : void {
    bank.name = data.name;
    this.service.updateBank(bank).subscribe(() => {});
  }

  requestDeleteBank(bank : any) : void {
    const deleteBank = () => this.banks.splice(this.banks.indexOf(bank), 1);

    this.service.deleteBank(bank).subscribe(deleteBank);
  }

  reorderItems(from, to) : void {
    let bank = this.banks[from];

    this.banks.splice(from, 1);
    this.banks.splice(to, 0, bank);

    const bankA = this.banks[from];
    const bankB = this.banks[to];

    this.service.swapBanks(bankA.index, bankB.index)
        .subscribe(() => {
          const indexA = bankA.index
          bankA.index = bankB.index
          bankB.index = indexA
        });
  }
}
