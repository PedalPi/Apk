import {ConnectionsDrawer} from './connections-drawer';
import {Plug} from '../model/plug';


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

  drawToPoint(plug : Plug) {
    const position = plug.position;
    this.line.attr('d', `M${position.x},${position.y}L${position.x},${position.y}`);
  }

  draw(origin : Plug, destination : {x, y}) {
    this.line.attr('d', () => ConnectionsDrawer.line(origin.position, destination));
  }
}
