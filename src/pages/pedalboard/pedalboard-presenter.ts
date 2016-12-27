import {PedalboardPage} from './pedalboard';
import {JsonService} from '../../providers/json/json-service';

import {Effect} from '../../plugins-manager/model/effect';
import {Pedalboard} from '../../plugins-manager/model/pedalboard';


export class PedalboardPresenter {
  constructor(
      private page : PedalboardPage,
      private jsonService : JsonService) {}

  private get service() {
    return this.jsonService.param;
  }

  private get currentService() {
    return this.jsonService.current;
  }

  //==========================
  // Pedalboard methods
  //==========================
  public getBeforePedalboardOf(pedalboard) : Pedalboard {
    const bank = pedalboard.bank

    let index = pedalboard.index - 1;
    if (index == -1)
      index = bank.pedalboards.length-1;

    return bank.pedalboards[index];
  }

  public getNextPedalboardOf(pedalboard) : Pedalboard {
    const bank = pedalboard.bank

    let index = pedalboard.index + 1;
    if (index == bank.pedalboards.length)
      index = 0;

    return bank.pedalboards[index];
  }

  //==========================
  // Request methods
  //==========================
  public requestSetCurrentPedalboard(pedalboard : Pedalboard) {
    this.currentService
        .setPedalboard(pedalboard)
        .subscribe(() => {});
  }

  public requestUpdateParam(param, newValue) {
    param.value = newValue;

    this.service.updateParam(param).subscribe(() => {});
  }

  public requestToggleStatusEffect(effect : Effect) {
    const update = () => effect.active = !effect.active;

    this.currentService
        .toggleStatusEffect(effect)
        .subscribe(update);
  }
}
