import * as d3 from 'd3';

export class ZoomBehaviour {

  constructor(svg, element) {
    const width = svg.node().getBoundingClientRect().width;
    const height = svg.node().getBoundingClientRect().height;
    const limit = 500;

    svg.call(
      d3.zoom()
        .scaleExtent([1/3, 2])
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
