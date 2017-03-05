import * as d3 from 'd3';
import {PedalboardView} from '../pedalboard-view';


export class ZoomBehaviour {

  constructor(svg, element, pedalboardView : PedalboardView) {
    //const width = svg.node().getBoundingClientRect().width;
    //const height = svg.node().getBoundingClientRect().height;
    const size = pedalboardView.size;

    const width = size.width;
    const height = size.height;

    const limit = 500;


    // Combine the two changes to
    const translatey = 20;
    const scale = svg.node().getBoundingClientRect().width / width;
    // - start view scaled
    element.attr("transform", `translate(0, ${translatey})scale(${scale})`);
    const transform = d3.zoomTransform(element)
                        .translate(0, translatey)
                        .scale(scale);
    // - start drawing scaled
    svg.call(d3.zoom().transform, transform);

    svg.call(
      d3.zoom()
        .scaleExtent([1/3 < scale ? 1/3 : scale, 2])
        .translateExtent([[-limit, -limit], [width+limit, height+limit]])
        .on("zoom", () => this.zoomed(element))
        .on("start", () => d3.select('body').style("cursor", "move"))
        .on("end", () => d3.select('body').style("cursor", "auto"))
      );
  }

  private zoomed(element) {
    element.attr("transform", d3.event.transform);
    return true;
  }
}
