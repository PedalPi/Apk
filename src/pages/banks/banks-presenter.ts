import {DataService} from '../../providers/data/data-service';
import {JsonService} from '../../providers/json/json-service';
import {BanksService} from '../../providers/json/banks-service';

import {Default} from '../../plugins-manager/default';
import {Bank} from '../../plugins-manager/model/bank';

import {BanksPage} from './banks';

import {MessagesList} from '../../common/message/messages-list';


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

  private async translate(text : string, data : any = {}) {
    return this.page.translate.get(text, data).toPromise();
  }

  async requestSaveNewBank(name: string, callback : any = null) : Promise<Bank> {
    const bank = new Bank(name.trim());
    await this.validate(bank, this.banks);

    bank.manager = this.data.remote.manager;

    const pedalboard = Default.defaultPedalboard('Empty pedalboard');
    pedalboard.bank = bank;
    bank.pedalboards.push(pedalboard);

    await this.service.saveNew(bank).toPromise();
    this.manager.banks.push(bank);
    return bank;
  }

  private async validate(bank : Bank, banks : Array<Bank>) {
    const errors = new MessagesList();
    if (bank.name == "")
      errors.add(await this.translate('ERROR_BANK_NAME_EMPTY'));

    const filterByName = otherBank => otherBank.name.toUpperCase() == bank.name.toUpperCase()
                                   && otherBank != bank;
    const existsBankWithSameName = this.banks.filter(filterByName).length > 0;

    if (existsBankWithSameName)
      errors.add(await this.translate('ERROR_BANK_SAME_NAME', {name: bank.name}));

    if (!errors.isEmpty())
      throw errors;
  }

  async requestRenameBank(bank : Bank, newName: string) {
    const oldName = bank.name;
    bank.name = newName.trim();
    try {
      await this.validate(bank, this.banks);
    } catch (messages) {
      bank.name = oldName;
      throw messages;
    }

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
