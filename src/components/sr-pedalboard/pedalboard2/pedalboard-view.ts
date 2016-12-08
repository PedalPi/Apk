import {EffectsDrawer} from './drawer/effects-drawer';
import {ConnectionsDrawer} from './drawer/connections-drawer';

import {Connection} from './model/connection';
import {Effect} from './model/effect';
import {Plug, Output} from './model/plug';
import {EdgeConnector} from './drawer/edge-connector';
import {PlugsColliderDettector} from './util/plugs-collider-dettector';

import * as d3 from 'd3';


export class PedalboardView {
  private svg;
  private connectionsNodes;
  private effectsNodes;

  private objectSelected = null;

  private edgeConnector : EdgeConnector;

  constructor(svgElement) {
    this.svg = d3.select(svgElement);

    this.edgeConnector = new EdgeConnector(this.svg);

    this.connectionsNodes = this.svg.append("g").attr('id', 'connections').selectAll("g");
    this.effectsNodes = this.svg.append("g").attr('id', 'effects').selectAll("g");

    //this.systemEffectElement = pedalboard.append("g").attr('id', 'system-node').selectAll('g');
  }

  /*************************************
   * Update
   ************************************/
  updateEffects(effects : Array<Effect>) {
    this.effectsNodes = EffectsDrawer.draw(effects, this.effectsNodes, this);
  }

  updateConnections(connections : Array<Connection>) {
    this.connectionsNodes = ConnectionsDrawer.draw(connections, this.connectionsNodes);
  }

  /*************************************
   * Selection
   ************************************/
  get selected() {
    return this.selected;
  }

  deselectCurrent() {
    if (this.objectSelected === null)
      return;

    this.objectSelected.view.classed("selected", false);
    this.objectSelected = null;
  }

  select(object) {
    this.deselectCurrent();

    object.view.classed("selected", true);
    this.objectSelected = object;
  }

  /*************************************
   * Connector
   ************************************/
  startConnecting(plugOrigin : Plug) {
    this.svg.classed('connecting', true);
    this.edgeConnector.drawToPoint(plugOrigin);
  }

  duringConnecting(plugOrigin : Plug) {
    this.edgeConnector.draw(plugOrigin, this.mousePosition);
  }

  endConnecting(plugOrigin : Output) {
    this.svg.classed('connecting', false);

    const plugTarget = PlugsColliderDettector.dettectCollision(plugOrigin, this.connectionsTarget, this.mousePosition);

    if (plugTarget !== null && plugOrigin !== plugTarget)
      plugOrigin.onConnectedListener(plugOrigin, plugTarget);
  }

  private get mousePosition() : {x: number, y: number} {
    const mouse = d3.mouse(this.svg.node());
    return {
      x: mouse[0],
      y: mouse[1]
    };
  }

  /*************************************
   * Finds
   ************************************/
  private get connectionsTarget() {
    return this.svg.selectAll('.connection-target');
  }
}
