import {PedalboardView} from './pedalboard-view';
import {Connection} from './model/connection';
import {Effect} from './model/effect';
import {SystemEffect} from './model/system-effect';
import {Output, Input} from './model/plug';


export class Pedalboard {
  private effectIndex = 0;
  private connectionIndex = 0;

  private view : PedalboardView;
  public effects : Array<Effect> = [];
  private connections : Array<Connection> = [];

  private systemEffect : SystemEffect;

  constructor(svgElement, systemEffect : SystemEffect) {
    this.systemEffect = systemEffect;
    this.systemEffect.outputs
          .forEach(output => output.onConnectedListener =
                  (output, input) => this.addConnection(output, input));

    this.view = new PedalboardView(svgElement);
    this.view.updateSystemEffect(this.systemEffect);
  }

  private updateAll() {
    this.view.updateEffects(this.effects);
    this.view.updateConnections(this.connections);
  }

  /*************************************
   * Add
   ************************************/
  addEffect(effect : Effect) {
    effect.id = this.effectIndex++;
    effect.onSelectedListener = (effect : Effect) => this.select(effect);
    effect.onDragListener = (effect : Effect) => this.updateAll();

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

  /*************************************
   * Remove
   ************************************/
  public removeSelected() {
    let selected = this.view.selected;
    if (selected == null)
      return;

    if (selected.constructor.name == "Effect")
        this.removeEffect(selected)
    else
      this.removeConnection(selected);

    this.view.deselectCurrent();
    this.updateAll();
  }

  private removeEffect(effect : Effect) {
    console.log('Effect removed', effect);
    this.effects.splice(this.effects.indexOf(effect), 1);
    this.removeConnectionsOf(effect);
    //this.callback.onEffectRemoved(effect.data);
    this.updateAll();
  }

  private removeConnectionsOf(effect : Effect) {
    let connectionsRemoved = this.connections.filter(
      (connection : Connection) => {
        return connection.output.effect === effect
            || connection.input.effect === effect;
      }
    );

    connectionsRemoved.map(connection => this.removeConnection(connection));
  }

  private removeConnection(connection : Connection) {
    this.connections.splice(this.connections.indexOf(connection), 1);
    //this.callback.onConnectionRemoved(connection.details());
    this.view.updateConnections(this.connections);
  }
}
