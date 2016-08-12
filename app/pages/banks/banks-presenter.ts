import {BankGenerator} from '../../generator/modelGenerator';
import {JsonService} from '../../service/jsonService';

import {BanksPage} from './banks';


export class BanksPresenter {
  private jsonService : JsonService;
  private page : BanksPage;
  public banks;

  constructor(page : BanksPage, jsonService : JsonService) {
    this.jsonService = jsonService;
    this.page = page;
    this.banks = [];
  }

  private get service() {
    return this.jsonService.banks;
  }

  requestBanks() {
    this.service.getBanks()
        .subscribe(data => this.banks = data.banks);
  }

  requestSaveBank(data: any) {
    const bank = BankGenerator.generate(data.name);
    const saveBank = status => {
      bank.index = status.index;
      this.banks.push(bank);
    }

    this.service.saveNewBank(bank).subscribe(saveBank);
  }

  requestRenameBank(bank : any, data: any) {
    bank.name = data.name;
    this.service.updateBank(bank).subscribe(() => {});
  }

  requestDeleteBank(bank : any) {
    const deleteBank = () => this.banks.splice(this.banks.indexOf(bank), 1);

    this.service.deleteBank(bank).subscribe(deleteBank);
  }

  reorderItems(from, to) {
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
