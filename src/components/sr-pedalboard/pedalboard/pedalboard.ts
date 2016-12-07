import {Effect, Lv2Effect, SystemEffect} from './model/effect';
import {Connection} from './model/connection';
import {SystemPort} from './model/port';
import {EdgeConnector} from './edge-connector';
import {ConnectionDrawer} from './drawer/connection-drawer';
import {EffectDrawer} from './drawer/effect-drawer';
import {SystemEffectDrawer} from './drawer/systemeffect-drawer';
import {ConnectionUtil} from './util/connection-util';
import {KeyboardManager} from './manager/keyboard-manager';

import * as d3 from 'd3';


export class Pedalboard {
  private id : number = 0; // FIXME - Id effects

  private svg : any;

  public systemEffect : SystemEffect;
  public systemEffectElement : any;

  public effects : Array<Effect> = [];
  public effectsElements : any;

  private connections : Array<any> = [];
  private connectionsElements : any;

  private callback = {
    onConnectionAdded: (connection : {}) => {},
    onConnectionRemoved: (connection : {}) => {},
    onEffectRemoved: (effect : Effect) => {}
  };

  private selected = {
    effect: null,
    connection: null
  };

  public edgeConnector : EdgeConnector;
  private keyboardManager : KeyboardManager;

  constructor(svg, systemEffect : SystemEffect) {
    this.systemEffect = systemEffect;

    this.svg = svg;
    this.draw(svg);

    // FIXME Disabled: Add remove effect callback support
    //this.keyboardManager = this.registerKeyboard(window);
    window.addEventListener('resize', () => this.updateWindow(svg));
  }

  draw(svg) {
    const pedalboard = svg.append("g")
        .attr("id", "pedalboard");

    this.edgeConnector = new EdgeConnector(pedalboard);

    this.connectionsElements = pedalboard.append("g").attr('id', 'edges').selectAll("g");
    this.effectsElements = pedalboard.append("g").attr('id', 'nodes').selectAll("g");

    this.systemEffectElement = pedalboard.append("g").attr('id', 'system-node').selectAll('g');

    const element = this.systemEffectElement.data([this.systemEffect], node => node.id);
    this.systemEffectElement = new SystemEffectDrawer(this).draw(element);

    svg.call(this.dragPedalboardEvent());
  }

  dragPedalboardEvent() {
    return d3.zoom()
      .scaleExtent([1/2, 2])
      .on("zoom", () => this.zoomed())
      .on("start", () => d3.select('body').style("cursor", "move"))
      .on("end", () => d3.select('body').style("cursor", "auto"));
  }

  /*************************************
   * Events
   *************************************/
  private registerKeyboard(window) : KeyboardManager {
    const BACKSPACE_KEY = 8;
    const DELETE_KEY = 46;

    const keyboardManager = new KeyboardManager(window);

    let removeSeleted = () => {
      this.removeSelected();
      this.update();
    }

    keyboardManager.register(BACKSPACE_KEY, removeSeleted);
    keyboardManager.register(DELETE_KEY, removeSeleted);

    return keyboardManager;
  }

  private zoomed() {
    this.svg.select("#pedalboard")
      .attr("transform", d3.event.transform);

    return true;
  }

  private updateWindow(svg) {
    const documentElement = document.documentElement;
    const body = document.getElementsByTagName('body')[0];

    var x = window.innerWidth || documentElement.clientWidth || body.clientWidth;
    var y = window.innerHeight|| documentElement.clientHeight|| body.clientHeight;

    svg.attr("width", x).attr("height", y);
  }

  /*************************************
   * Update
   *************************************/
  update() {
    this.updateConnections();
    this.updateEffects();
  }

  updateConnections() {
    const elements = this.connectionsElements.data(this.connections);
    const connection = this.selected.connection;

    this.connectionsElements = new ConnectionDrawer(this).draw(elements, connection);
  }

  updateEffects() {
    const elements = this.effectsElements.data(this.effects, node => node.id);
    this.effectsElements = new EffectDrawer(this).draw(elements);
  }

  /*************************************
   * Selection and desselection
   *************************************/
  selectConnection(element, connection) {
    this.deselectCurrent();

    element.classed("selected", true);

    this.selected.connection = connection;
    //this.update();
  }

  selectEffect(element, effect : Effect) {
    this.deselectCurrent();

    element.classed("selected", true);

    this.selected.effect = effect;
    //this.update();
  }

  deselectCurrent() {
    if (this.selected.effect !== null) {
      this.deselectEffect(this.selected.effect);
      this.selected.effect = null;

    } else if (this.selected.connection !== null) {
      this.deselectConnection(this.selected.connection);
      this.selected.connection = null;
    }
  }

  deselectEffect(effect) {
    this.effectsElements.filter(circle => circle.id === effect.id)
        .classed("selected", false);
  }

  deselectConnection(connection) {
    this.connectionsElements.filter(cd => cd === connection)
        .classed("selected", false);
  }

  /*************************************
   * Drag
   *************************************/
  startConnecting() {
    this.svg.classed('connecting', true);
  }

  endConnecting() {
    this.svg.classed('connecting', false);
  }

  /********************************
   * API methods
   ********************************/
   clear() {
     this.effects = [];
     this.connections = [];
     this.update();
   }

   addEffect(effect : Effect) {
     effect.id = this.id++;

     this.effects.push(effect);
     this.update();
   }

   public addConnection(effectSource : Effect, portSource, effectTarget : Effect, portTarget) {
     const util = new ConnectionUtil(this);

     const outputSourceElement = util.elementOfPort(effectSource, portSource, 'output');
     const inputTargetElement = util.elementOfPort(effectTarget, portTarget, 'input');

     this.createConnection(outputSourceElement, inputTargetElement);
   }

   /*
   public addSystemOutConnection(systemOutput, effectTarget : Effect, portTarget) {
     const util = new ConnectionUtil(this);

     const outputSourceElement = util.elementOfPort(effectSource, portSource, 'output');
     const inputTargetElement = util.elementOfPort(effectTarget, portTarget, 'input');

     this.createConnection(outputSourceElement, inputTargetElement);
   }

   public addSystemInConnection(effectSource : Effect, portSource, systemInput) {
     const util = new ConnectionUtil(this);

     const outputSourceElement = util.elementOfPort(effectSource, portSource, 'output');
     const inputTargetElement = util.elementOfPort(effectTarget, portTarget, 'input');

     this.createConnection(outputSourceElement, inputTargetElement);
   }
   */

   createConnection(elementSource, elementTarget) {
     const newConnection = new Connection({source: elementSource, target: elementTarget});

     for (let connection of this.connections)
       if (connection.source === newConnection.source && connection.target === newConnection.target)
         return;

     this.connections.push(newConnection);
     this.update();
     this.callback.onConnectionAdded(newConnection.details());
   }

   removeSelected() {
     if (this.selected.effect !== null)
       this.removeSelectedEffect();
     else if (this.selected.connection !== null)
       this.removeSelectedConnection();

     this.update();
   }

  /*************************************
   * Remove
   ************************************/
  removeSelectedEffect() {
    this.removeEffect(this.selected.effect);
    this.selected.effect = null;
  }

  removeEffect(effect) {
    this.effects.splice(this.effects.indexOf(effect), 1);
    this.removeConnectionsOf(effect);
    this.callback.onEffectRemoved(effect.data);
  }

  removeConnectionsOf(effect) {
    let connectionsRemoved = this.connections.filter(
      connection => {
        const target = Lv2Effect.effectOfPort(d3.select(connection.target));
        const source = Lv2Effect.effectOfPort(d3.select(connection.source));

        return source === effect || target === effect;
      }
    );

    connectionsRemoved.map(connection => this.removeConnection(connection));
  }

  removeSelectedConnection() {
    this.removeConnection(this.selected.connection);
    this.selected.connection = null;
  }

  removeConnection(connection) {
    this.connections.splice(this.connections.indexOf(connection), 1);
    this.callback.onConnectionRemoved(connection.details());
  }

  /********************************
   * Gets
   ********************************/
  get mousePosition() : {x: number, y: number} {
    const mouse = d3.mouse(this.svg.select('#pedalboard').node());
    return {
      x: mouse[0],
      y: mouse[1]
    };
  }

  get inputPorts() {
    return this.svg.selectAll('.input-port');
  }

  /********************************
   * Callback
   ********************************/
  set onConnectionAdded(callback : (connection : Connection) => void) {
    this.callback.onConnectionAdded = callback;
  }

  set onConnectionRemoved(callback : (connection : Connection) => void) {
    this.callback.onConnectionRemoved = callback;
  }

  set onEffectRemoved(callback : (effect : Effect) => void) {
    this.callback.onEffectRemoved = callback;
  }
}
