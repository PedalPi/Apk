import * as d3 from 'd3';

export class ZoomBehaviour {

  constructor(svg, element) {
    svg.call(
      d3.zoom()
        .scaleExtent([1/2, 2])
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
