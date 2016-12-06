import {Pedalboard} from '../pedalboard';
import {PortDrawerInput, PortDrawerOutput} from './port-drawer';

import * as d3 from 'd3';


export class SystemEffectDrawer {
  private static SIZE = {width:100, height:150};
  private pedalboard : Pedalboard;

  constructor(pedalboard : Pedalboard) {
    this.pedalboard = pedalboard;
  }

  draw(element) {
    element.exit().remove();
    const newElements = this.drawIn(element.enter());

    return element.merge(newElements);
  }

  private drawIn(effect) {
    const container = effect.append("g")
      .classed("system-effect", true);

    const portsInput = container.append("g")
      .classed('input-ports', true);

    const portsOuput = container.append("g")
      .classed('output-ports', true);

    new PortDrawerInput(SystemEffectDrawer.SIZE)
      .drawIn(portsInput)
      .classed('input-port', true);
    new PortDrawerOutput(this.pedalboard, SystemEffectDrawer.SIZE)
      .drawIn(portsOuput)
      .classed('output-port', true);

    return container;
  }
}
