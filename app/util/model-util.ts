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
}
