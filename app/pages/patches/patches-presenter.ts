import {JsonService} from '../../service/json/json-service';

import {PatchGenerator} from '../../generator/modelGenerator';
import {PatchService} from '../../service/json/patch-service';
import {BanksService} from '../../service/json/banks-service';

import {PatchesPage} from './patches';

export class PatchesPresenter {
  private page : PatchesPage;
  public bank : any;
  private jsonService : JsonService;

  constructor(page : PatchesPage, bank : any, jsonService : JsonService) {
    this.page = page;
    this.bank = bank;
    this.jsonService = jsonService;
  }

  private get service() : PatchService {
    return this.jsonService.patch;
  }

  private get banksService() : BanksService {
    return this.jsonService.banks;
  }

  requestSavePatch(data : any) : void {
    const patch = PatchGenerator.generate(data.name);
    const savePatch = status => this.bank.patches.push(patch);

    this.service.saveNewPatch(this.bank, patch).subscribe(savePatch);
  }

  requestDeletePatch(patch : any) : void {
    const deletePatch = () => {
      const patchIndex = this.bank.patches.indexOf(patch);
      this.bank.patches.splice(patchIndex, 1);
    };

    this.service.deletePatch(this.bank, patch).subscribe(deletePatch);
  }

  requestRenamePatch(patch : any, data : any) : void {
    patch.name = data.name;
    this.service.updatePatch(this.bank, patch).subscribe(() => {});
  }

  reorderItems(from, to) : void {
    const patch = this.bank.patches[from];

    this.bank.patches.splice(from, 1);
    this.bank.patches.splice(to, 0, patch);

    this.banksService.swapPatches(this.bank, from, to)
        .subscribe(() => {});
  }
}
