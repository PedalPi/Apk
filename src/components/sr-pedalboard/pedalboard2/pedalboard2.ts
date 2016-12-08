import {PedalboardView} from './pedalboard-view';
import {Connection} from './model/connection';
import {Effect} from './model/effect';
import {Output, Input} from './model/plug';


export class Pedalboard {
  private effectIndex = 0;
  private connectionIndex = 0;

  private view : PedalboardView;
  private effects : Array<Effect> = [];
  private connections : Array<Connection> = [];

  constructor(svgElement) {
    this.view = new PedalboardView(svgElement);
  }

  addEffect(effect : Effect) {
    effect.id = this.effectIndex++;
    effect.onSelectedListener = (effect : Effect) => this.select(effect);
    effect.onDragListener = (effect : Effect) => {
      this.view.updateEffects(this.effects);
      this.view.updateConnections(this.connections);
    }

    effect.outputs
          .forEach(output => output.onConnectedListener =
                  (output, input) => this.addConnection(output, input));

    this.effects.push(effect);
    this.view.updateEffects(this.effects);
  }

  addConnection(output : Output, input : Input) {
    const connection = new Connection(output, input);
    connection.index = this.connectionIndex++;
    connection.onSelectedListener = (connection : Connection) => this.select(connection);

    this.connections.push(connection);
    this.view.updateConnections(this.connections);
  }

  private select(object) {
    this.view.select(object);
  }
}
