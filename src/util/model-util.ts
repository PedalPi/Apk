export class ModelUtil {
  public static getBank(banks : Array<any>, realIndex : number) {
    let index = 0;
    for (let bank of banks)
      if (bank.index == realIndex)
        return bank;

    return undefined;
  }

  public static getBankListIndex(banks : Array<any>, realIndex : number) {
    let index = 0;
    for (let bank of banks) {
      if (bank.index == realIndex)
        return index;

      index++;
    }

    return -1;
  }

  public static processEffect(effect) {
    for (let i=0; i<effect.params.length; i++)
      effect.plugin.ports.control.input[i].value = effect.params[i].value;

    return effect;
  }
}
