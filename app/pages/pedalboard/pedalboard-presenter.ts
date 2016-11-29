import {PedalboardPage} from './pedalboard';
import {JsonService} from '../../service/json/json-service';


export class PedalboardPresenter {
  constructor(
      private page : PedalboardPage,
      private jsonService : JsonService,
      public bank) {}

  private get service() {
    return this.jsonService.param;
  }

  private get currentService() {
    return this.jsonService.current;
  }

  //==========================
  // Pedalboard methods
  //==========================
  public getBeforePedalboardOf(pedalboard) : Object {
    let index = this.getPedalboardIndex(pedalboard) - 1;
    if (index == -1)
      index = this.bank.pedalboards.length-1;

    return this.bank.pedalboards[index];
  }

  public getNextPedalboardOf(pedalboard) : Object {
    let index = this.getPedalboardIndex(pedalboard) + 1;
    if (index == this.bank.pedalboards.length)
      index = 0;

    return this.bank.pedalboards[index];
  }

  private getPedalboardIndex(pedalboard) : number {
    return this.bank.pedalboards.indexOf(pedalboard);
  }

  //==========================
  // Request methods
  //==========================
  public requestSetCurrentPedalboard(pedalboard) {
    this.currentService.setPedalboard(this.bank, pedalboard)
        .subscribe(() => {});
  }

  public requestUpdateParam(pedalboard, effect, param, newValue) {
    param.value = newValue;

    this.service.updateParam(this.bank, pedalboard, effect, param).subscribe(() => {});
  }

  public requestToggleStatusEffect(pedalboard, effect) {
    const update = () => effect.status = !effect.status;

    this.currentService
        .toggleStatusEffect(this.bank, pedalboard, effect)
        .subscribe(update);
  }

  //==========================
  // Param methods
  //==========================

  public parameterType(parameter) {
    if (this.isParameterKnob(parameter))
      return "knob";
    else if (this.isParameterCombobox(parameter))
      return "combobox";
    else
      return "toggle";
  }

  public isParameterKnob(parameter) : boolean {
    return parameter.properties.indexOf('enumeration') == -1
        && parameter.properties.indexOf('toggled') == -1
  }

  public isParameterCombobox(param) : boolean {
    return param.properties.indexOf('enumeration') != -1;
  }

  public isParameterToggle(parameter) : boolean {
    return parameter.properties.indexOf('toggled') != -1
  }
}
