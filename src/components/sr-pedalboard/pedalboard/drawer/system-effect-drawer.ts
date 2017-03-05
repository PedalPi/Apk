import {SystemEffect} from '../model/system-effect';
import {InputPlugDrawer, OutputPlugDrawer} from './plug-drawer';
import {PedalboardView} from '../pedalboard-view';


import * as d3 from 'd3';


export class SystemEffectDrawer {

  private constructor() {}

  static draw(systemEffect : SystemEffect, systemEffectNode, pedalboardView : PedalboardView) {
    let size = pedalboardView.size;

    size.width = Math.max(size.width, size.height) - 20;
    size.height = Math.min(size.width, size.height);

    systemEffect.x = size.width/2;
    systemEffect.y = 400;//size.bottom/2 + 20;

    systemEffectNode = systemEffectNode.data([systemEffect])
      .attr("transform", this.effectPosition());

    const inputs = systemEffectNode.append("g").classed('inputs', true);
    const outputs = systemEffectNode.append("g").classed('outputs', true);

    new InputPlugDrawer(size)
      .drawIn(inputs, true)
        .classed('input', true)
        .classed('connection-target', true);
    new OutputPlugDrawer(pedalboardView, size)
      .drawIn(outputs, true)
      .classed('output', true);

    systemEffect.view = d3.select(systemEffectNode);

    return systemEffectNode;
  }

  private static effectPosition() : (SystemEffect) => any {
    return effect => `translate(${effect.x}, ${effect.y})`;
  }
}
