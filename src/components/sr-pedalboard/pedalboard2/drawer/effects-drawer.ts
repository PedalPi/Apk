import {Effect} from '../model/effect';
import {InputPlugDrawer, OutputPlugDrawer} from './plug-drawer';
import {PedalboardView} from '../pedalboard-view';


import * as d3 from 'd3';


export class EffectsDrawer {
  private static SIZE = {width:100, height:150};

  private constructor() {}

  static draw(effects : Array<Effect>, effectsNodes, pedalboardView : PedalboardView) {
    // Update effects
    const effectsNodesUpdated = effectsNodes
      .data(effects, effect => effect.id)
        .attr("transform", this.effectPosition());

    // Remove old effects
    effectsNodes.exit().remove();

    // Draw new effects
    const newEffects = effectsNodes.enter()
      .append("g")
        .classed("effect", true)
        .attr("transform", this.effectPosition())

        .on("mousedown", this.selectEffect())
        .on("touchstart",this.selectEffect())

        .call(d3.drag().on("drag", this.drag()))

      .append("rect")
        .classed('background', true);

    const inputs = newEffects.append("g").classed('input-ports', true);
    const outputs = newEffects.append("g").classed('output-ports', true);

    new InputPlugDrawer(EffectsDrawer.SIZE)
      .drawIn(inputs)
        .classed('input-port', true)
        .classed('connection-taget', true);
    new OutputPlugDrawer(pedalboardView, EffectsDrawer.SIZE)
      .drawIn(outputs).classed('output-port', true);

    // Add view in data
    newEffects.each(function(effect : Effect) {
      effect.view = d3.select(this);
    });

    // Merge
    return newEffects.merge(effectsNodesUpdated);
  }

  private static effectPosition() : (Effect) => any {
    return effect => `translate(${effect.x}, ${effect.y})`;
  }

  private static selectEffect() : (Effect) => any {
    return effect => {
      effect.onSelectedListener(effect);
      d3.event.stopPropagation();
    };
  }

  private static drag() {
    return (effect : Effect) => {
      effect.x += d3.event.dx;
      effect.y += d3.event.dy;

      effect.onDragListener(effect);
    }
  }
}
