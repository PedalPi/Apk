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
    effectsNodesUpdated.exit().remove();

    // Draw new effects
    const newEffects = effectsNodesUpdated.enter()
      .append("g")
        .classed("effect", true)
        .attr("transform", this.effectPosition())

        .on("mousedown", this.selectEffect())
        .on("touchstart",this.selectEffect())
        .on("dblclick", this.selectEffectDoubleClick())

        .call(d3.drag().on("drag", this.drag()));

    newEffects
      .append("rect")
        .classed('background', true);

    const inputs = newEffects.append("g").classed('inputs', true);
    const outputs = newEffects.append("g").classed('outputs', true);

    new InputPlugDrawer(EffectsDrawer.SIZE)
      .drawIn(inputs)
        .classed('input', true)
        .classed('connection-target', true);
    new OutputPlugDrawer(pedalboardView, EffectsDrawer.SIZE)
      .drawIn(outputs).classed('output', true);

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

  private static selectEffectDoubleClick() : (Effect) => any {
    return effect => {
      effect.onSelectedDoubleClickListener(effect);
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
