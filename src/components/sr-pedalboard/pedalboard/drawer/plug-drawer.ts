import {PedalboardView} from '../pedalboard-view';

import * as d3 from 'd3';


export abstract class PlugDrawer {
  private static RADIUS = 20;
  private static PADDING = 5;

  protected effectSize : {width: number, height: any};

  constructor(effectSize : {width: number, height: any}) {
    this.effectSize = effectSize;
  }

  drawIn(container, reverse : boolean = false) {
    return container.selectAll("circle")
      .data(effect => this.plugs(effect))
      .enter()
      .append("circle")
        .attr("r", PlugDrawer.RADIUS)
        .attr("cx", this.x(reverse))
        .attr("cy", this.y())
      .each(function(object) {
        object.view = d3.select(this);
      });
  }

  plugs(effect) {}

  abstract x(reverse : boolean);

  y() {
    return (data, index) => {
      const startPosition = PlugDrawer.RADIUS + PlugDrawer.PADDING - this.effectSize.height/2;
      const elementSize = 2*PlugDrawer.RADIUS + 2*PlugDrawer.PADDING;

      return index*elementSize + startPosition;
    }
  }
}

export class InputPlugDrawer extends PlugDrawer {
  plugs(effect) {
    return effect.inputs;
  }

  x(reverse : boolean) {
    return (data, index) => this.effectSize.width/2 * (!reverse ? -1 : 1);
  }
}

export class OutputPlugDrawer extends PlugDrawer {

  private pedalboardView : PedalboardView;

  constructor(pedalboardView : PedalboardView, effectSize : {width: number, height: any}) {
    super(effectSize);
    this.pedalboardView = pedalboardView;
  }

  plugs(effect) {
    return effect.outputs;
  }

  x(reverse : boolean) {
    return (data, index) => this.effectSize.width/2 * (reverse ? -1 : 1);
  }

  drawIn(container, reverse : boolean = false) {
    return super.drawIn(container, reverse)
      .call(this.generateDragBehavior());
  }

  private generateDragBehavior() {
    return d3.drag()
      .on("start", plug => this.dragStart(plug))
      .on("drag", plug => this.drag(plug))
      .on("end", plug => this.dragEnd(plug));
  }

  dragStart(plug) {
    this.pedalboardView.startConnecting(plug);
  }

  drag(plug) {
    this.pedalboardView.duringConnecting(plug);
  }

  dragEnd(output) {
    this.pedalboardView.endConnecting(output);
  }
}
