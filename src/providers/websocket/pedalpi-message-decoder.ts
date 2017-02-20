import {DataService} from "../data/data-service";
import {JsonService} from "../json/json-service";

import {BanksManager} from "../../plugins-manager/banks-manager";

import {Bank} from "../../plugins-manager/model/bank";
import {Pedalboard} from "../../plugins-manager/model/pedalboard";
import {Effect} from "../../plugins-manager/model/effect";
import {Param} from "../../plugins-manager/model/param";

import {BankReader, PedalboardReader} from "../../plugins-manager/decoder/persistence-decoder";

import {MessageDecoder} from './web-socket-service';

export enum UpdateType {
  CREATED, UPDATED, REMOVED
}

export class PedalPiMessageDecoder implements MessageDecoder {

  public onNotificationCurrentPedalboard : (pedalboard : Pedalboard) => any;

  public onNotificationBank : (type : UpdateType, bank : Bank) => any;
  public onNotificationPedalboard : (type : UpdateType, pedalboard : Pedalboard) => any;
  public onNotificationEffect : (type : UpdateType, effect : Effect) => any;

  public onNotificationEffectStatusToggled : (effect : Effect) => any;
  public onNotificationParamValueChange : (param: Param) => any;

  constructor(private data : DataService) {
    this.clearListeners();
  }

  private get manager() : BanksManager {
    return this.data.remote.manager;
  }

  public clearListeners() {
    this.onNotificationCurrentPedalboard = (pedalboard : Pedalboard) => {};

    this.onNotificationBank = (type : UpdateType, bank : Bank) => {};
    this.onNotificationPedalboard = (type : UpdateType, bank : Pedalboard) => {};
    this.onNotificationEffect = () => {};

    this.onNotificationEffectStatusToggled = (effect : Effect) => {};
    this.onNotificationParamValueChange = (param : Param) => {};
  }

  onMessage(message) {
    console.log(message);

    const type = message["type"];

    if (type == 'TOKEN')
      JsonService.token = message.value;

    if (JsonService.token == '')
      return;

    const updateType = this.updateType(message.updateType);

    if (type == 'CURRENT')
      this.onCurrentPedalboardChange(updateType, message);
    else if (type == 'BANK')
      this.onBankChange(updateType, message);
    else if (type == 'PEDALBOARD')
      this.onPedalboardChange(updateType, message);
    else if (type == 'EFFECT')
      this.onNotificationEffect(null, null); //message
    else if (type == 'EFFECT-TOGGLE')
      this.onEffectStatusToggled(message);
    else if (type == 'PARAM')
      this.onParamValueChange(message);
  }

  private updateType(updateType : string) {
    if (updateType == "UPDATED")
      return UpdateType.UPDATED;

    else if (updateType == "DELETED")
      return UpdateType.REMOVED;

    else if (updateType == "CREATED")
      return UpdateType.CREATED;
  }

  private onCurrentPedalboardChange(updateType : UpdateType, message : any) {
    // Set current value in DataService?
    //data service.current = current pedalboard
    this.onNotificationCurrentPedalboard(this.pedalboardBy(message));
  }

  private onBankChange(updateType : UpdateType, message : any) {
    let bank = null;

    if (updateType == UpdateType.UPDATED) {
      const index = message.bank;
      const bank = new BankReader(BanksManager.SYSTEM_EFFECT).read(message.value);
      this.manager.banks[index] = bank;

    } else if (updateType == UpdateType.REMOVED) {
      const index = message.bank;
      this.manager.banks.splice(index, 1);

    } else if (updateType == UpdateType.CREATED) {
      const bank = new BankReader(BanksManager.SYSTEM_EFFECT).read(message.value);
      bank.manager = this.manager;
      this.manager.banks.push(bank);
    }

    this.onNotificationBank(updateType, bank);
  }

  private onPedalboardChange(updateType : UpdateType, message : any) {
    const bank = this.bankBy(message.bank);
    const systemEffect = BanksManager.SYSTEM_EFFECT;
    const pluginsData = this.data.remote['plugins'];

    let pedalboard = null;

    if (updateType == UpdateType.UPDATED) {
      pedalboard = new PedalboardReader(systemEffect, pluginsData).read(message.value);
      pedalboard.bank = bank;

      bank.pedalboards[message.pedalboard] = pedalboard;

    } else if (updateType == UpdateType.REMOVED) {
      pedalboard = bank.pedalboards[message.pedalboard];
      bank.pedalboards.splice(message.pedalboard, 1);

    } else if (updateType == UpdateType.CREATED) {
      pedalboard = new PedalboardReader(systemEffect, pluginsData).read(message.value);
      pedalboard.bank = bank;

      bank.pedalboards.push(pedalboard);
    }

    this.onNotificationPedalboard(updateType, pedalboard);
  }

  private onEffectStatusToggled(message : any) {
    const effect = this.effectBy(message);
    effect.toggle();

    this.onNotificationEffectStatusToggled(message);
  }

  private onParamValueChange(message : any) {
    const param = this.paramBy(message);
    param.value = message.value;

    this.onNotificationParamValueChange(message);
  }

  private bankBy(index) : Bank {
    return this.manager.banks[index];
  }

  private pedalboardBy(message) : Pedalboard {
    const bank = this.bankBy(message.bank);
    return bank.pedalboards[message.pedalboard];
  }

  private effectBy(message) : Effect {
    const pedalboard = this.pedalboardBy(message);
    return pedalboard.effects[message.effect];
  }

  private paramBy(message) : Param {
    const effect = this.effectBy(message);
    return effect.params[message.param];
  }
}
