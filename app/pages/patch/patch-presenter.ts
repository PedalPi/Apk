import {PatchPage} from './patch';
import {JsonService} from '../../service/json/json-service';


export class PatchPresenter {
  constructor(
      private page : PatchPage,
      private jsonService : JsonService,
      public bank) {}

  private get service() {
    return this.jsonService.param;
  }

  private get currentService() {
    return this.jsonService.current;
  }

  //==========================
  // Patch methods
  //==========================
  public getBeforePatchOf(patch) : Object {
    let index = this.getPatchIndex(patch) - 1;
    if (index == -1)
      index = this.bank.patches.length-1;

    return this.bank.patches[index];
  }

  public getNextPatchOf(patch) : Object {
    let index = this.getPatchIndex(patch) + 1;
    if (index == this.bank.patches.length)
      index = 0;

    return this.bank.patches[index];
  }

  private getPatchIndex(patch) : number {
    return this.bank.patches.indexOf(patch);
  }

  //==========================
  // Request methods
  //==========================
  public requestSetCurrentPatch(patch) {
    this.currentService.setPatch(this.bank, patch)
        .subscribe(() => {});
  }

  public requestUpdateParam(patch, effect, param, newValue) {
    param.value = newValue;

    this.service.updateParam(this.bank, patch, effect, param).subscribe(() => {});
  }

  public requestToggleStatusEffect(patch, effect) {
    const update = () => effect.status = !effect.status;

    this.currentService
        .toggleStatusEffect(this.bank, patch, effect)
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
