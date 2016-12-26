import {Bank} from '../model/bank';
import {Connection} from '../model/connection';
import {Pedalboard} from '../model/pedalboard';

import {Lv2Effect} from '../model/lv2/lv2-effect';
import {Lv2Input} from '../model/lv2/lv2-input';
import {Lv2Output} from '../model/lv2/lv2-output';
import {Lv2Param} from '../model/lv2/lv2-param';


export class PersistenceDecoder {
  constructor(private systemEffect) {}

  read(json) {
    return new BankReader(this.systemEffect).read(json)
  }
}


abstract class Reader {
  constructor(protected systemEffect) {}

  abstract read(this, json);
}


class BankReader extends Reader{

  read(json) {
    const bank = new Bank(json['name'])
    bank.index = json['index']

    const pedalboardReader = new PedalboardReader(this.systemEffect)
    for (let pedalboardJson of json['pedalboards']) {
      const pedalboard = pedalboardReader.read(pedalboardJson)
      pedalboard.bank = bank
      bank.pedalboards.push(pedalboard)
    }

    return bank
  }
}


class PedalboardReader extends Reader {

  read(json) {
    const pedalboard = new Pedalboard(json['name'])

    const effect_reader = new EffectReader(this.systemEffect)
    for (let effect_json of json['effects'])
        pedalboard.effects.push(effect_reader.read(effect_json))

    /*
    const connectionReader = new ConnectionReader(pedalboard, this.systemEffect)
    for (let connectionJson of json['connections'])
      pedalboard.connections.push(connectionReader.read(connectionJson))
    */

    if ('data' in json)
      pedalboard.data = json['data']

    return pedalboard
  }
}


class EffectReader extends Reader {

  read(json) {
    if (json['technology'] == 'lv2')
      return this.readLv2(json)

    throw Error('Unknown effect technology: ' + json['technology'])
  }

  private readLv2(json) {
    const effect = new Lv2Effect(json['pluginData'])

    for (let i=0; i < effect.params.length; i++) {
      const param = effect.params[i]
      const paramJson = json['params'][i]

      param.value = paramJson['value']
    }

    effect.active = json['active']

    return effect
  }
}


class ConnectionReader extends Reader {
  private pedalboard: Pedalboard;

  constructor(pedalboard, systemEffect) {
    super(systemEffect)
    this.pedalboard = pedalboard
  }

  read(json) {
    let input, output;
    if ('effect' in json['output'])
      output = this.readOutput(json['output'])
    else
      output = this.readSystemOutput(json['output'])

    if ('effect' in json['input'])
      input = this.readInput(json['input'])
    else
      input = this.readSystemInput(json['input'])

    return new Connection(output, input)
  }

  private readOutput(this, json) {
    const index = json['symbol']

    const effectIndex = json['effect']
    const effect = this.pedalboard.effects[effectIndex]

    return effect.outputs[index]
  }

  private readInput(this, json) {
    const index = json['symbol']

    const effectIndex = json['effect']
    const effect = this.pedalboard.effects[effectIndex]

    return effect.inputs[index]
  }

  private readSystemOutput(this, json) {
    return this.systemEffect.outputs[json['symbol']]
  }

  private readSystemInput(this, json) {
    return this.systemEffect.inputs[json['symbol']]
  }
}
