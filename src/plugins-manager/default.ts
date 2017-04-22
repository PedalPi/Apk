import {BanksManager} from './banks-manager';
import {Connection} from './model/connection';
import {Pedalboard} from './model/pedalboard';


export class Default {
  public static defaultPedalboard(name) {
    const output = BanksManager.SYSTEM_EFFECT.outputs[0];
    const input = BanksManager.SYSTEM_EFFECT.inputs[0];

    const connection = new Connection(output, input);

    const pedalboard = new Pedalboard(name);
    pedalboard.connections.push(connection);

    return pedalboard;
  }
}
