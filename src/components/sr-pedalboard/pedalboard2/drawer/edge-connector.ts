import {ConnectionDrawer} from './drawer/connection-drawer';


export class EdgeConnector {
  private line;

  constructor(svgGroup) {
    this.line = this.generateEdgeLine(svgGroup);
  }

  private generateEdgeLine(node) {
    // Based in http://stackoverflow.com/a/34561659/1524997
    return node.append('svg:path')
      .attr('id', 'edgeConnector')
      .datum([{x:0, y:0}, {x:0, y:0}])
      .attr('class', 'link dragline')
      .attr('d', 'M0,0L0,0')
      .style('marker-end', 'url(#mark-end-arrow)');
  }

  drawToPoint(point) {
    this.line.attr('d', `M${point.x},${point.y}L${point.x},${point.y}`);
  }

  draw(origin, destination) {
    this.line.attr('d', () => ConnectionDrawer.generateConnection(origin, destination));
  }
}
