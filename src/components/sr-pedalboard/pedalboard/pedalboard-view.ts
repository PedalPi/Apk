import {EffectsDrawer} from './drawer/effects-drawer';
import {ConnectionsDrawer} from './drawer/connections-drawer';
import {SystemEffectDrawer} from './drawer/system-effect-drawer';

import {Connection} from './model/connection';
import {Effect} from './model/effect';
import {SystemEffect} from './model/system-effect';
import {Plug, Output} from './model/plug';
import {EdgeConnector} from './drawer/edge-connector';
import {PlugsColliderDettector} from './util/plugs-collider-dettector';

import {ZoomBehaviour} from './behaviour/zoom-behaviour';

import * as d3 from 'd3';


export class PedalboardView {
  private svg;
  private pedalboardNode;

  private systemEffectNode;
  private connectionsNodes;
  private effectsNodes;

  private selectedObject = null;

  private edgeConnector : EdgeConnector;

  constructor(svgElement) {
    this.svg = d3.select(svgElement);
    this.pedalboardNode = this.svg.append('g').attr('id', 'pedalboard');

    this.edgeConnector = new EdgeConnector(this.pedalboardNode);

    this.connectionsNodes = this.pedalboardNode.append("g").attr('id', 'connections').selectAll("g");
    this.systemEffectNode = this.pedalboardNode.append("g").attr('id', 'system-effect');
    this.effectsNodes = this.pedalboardNode.append("g").attr('id', 'effects').selectAll("g");

    new ZoomBehaviour(this.svg, this.pedalboardNode);
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

  updateSystemEffect(systemEffect : SystemEffect) {
    SystemEffectDrawer.draw(systemEffect, this.systemEffectNode, this);
  }

  /*************************************
   * Selection
   ************************************/
  get selected() {
    return this.selectedObject;
  }

  deselectCurrent() {
    if (this.selectedObject === null)
      return;

    this.selectedObject.view.classed("selected", false);
    this.selectedObject = null;
  }

  select(object) {
    this.deselectCurrent();

    object.view.classed("selected", true);
    this.selectedObject = object;
  }

  /*************************************
   * Connector
   ************************************/
  startConnecting(plugOrigin : Plug) {
    this.pedalboardNode.classed('connecting', true);
    this.edgeConnector.drawToPoint(plugOrigin);
  }

  duringConnecting(plugOrigin : Plug) {
    this.edgeConnector.draw(plugOrigin, this.mousePosition);
  }

  endConnecting(plugOrigin : Output) {
    this.pedalboardNode.classed('connecting', false);

    const plugTarget = PlugsColliderDettector.dettectCollision(plugOrigin, this.connectionsTarget, this.mousePosition);

    if (plugTarget !== null && plugOrigin !== plugTarget)
      plugOrigin.onConnectedListener(plugOrigin, plugTarget);
  }

  private get mousePosition() : {x: number, y: number} {
    const mouse = d3.mouse(this.pedalboardNode.node());
    return {
      x: mouse[0],
      y: mouse[1]
    };
  }

  /*************************************
   * Finds
   ************************************/
  private get connectionsTarget() {
    return this.pedalboardNode.selectAll('.connection-target');
  }

  get size() {
    const rect = this.svg.node().getBoundingClientRect();

    return {
      top: rect.top,
      bottom: rect.bottom,
      left: rect.left,
      right: rect.right,

      height: rect.height,
      width: rect.width
    };
  }
}
