import {Connection} from '../model/connection';

import * as d3 from 'd3';


export class ConnectionsDrawer {

  static draw(connections : Array<Connection>, connectionsNodes) {
    // Update existing connections
    let connectionsNodesUpdated = connectionsNodes
        .data(connections, (connection : Connection) => connection.id)
          .style('marker-end', 'url(#end-arrow)')
          .attr("d", this.lineFunction());

    // Remove old connections
    connectionsNodesUpdated.exit().remove();

    // Draw new connection
    const newConnections = connectionsNodesUpdated.enter()
      .append("path")
        .style('marker-end','url(#end-arrow)')
        .classed("link", true)
        .attr("d", this.lineFunction())

        .on("mousedown", this.selectConnection())
        .on("touchstart",this.selectConnection());

    // Add view in data
    newConnections.each(function(connection : Connection) {
      connection.view = d3.select(this);
    });

    // Merge
    return newConnections.merge(connectionsNodesUpdated);
  }

  private static selectConnection() : (Connection) => any {
    return connection => {
      connection.onSelectedListener(connection);
      d3.event.stopPropagation();
    };
  }

  private static lineFunction() {
    return (connection) =>
      this.line(connection.output.position, connection.input.position)
  }

  public static line(source : {x, y}, target : {x, y}) {
    return `M${source.x},${source.y}`
         + `C${(source.x + target.x) / 2},${source.y}`
         + ` ${(source.x + target.x) / 2},${target.y}`
         + ` ${target.x},${target.y}`;

    /*
    const diagonal = d3.line()
      .x(d => d.x)
      .y(d => d.y)
      .curve(d3.curveStep);

    return diagonal([source, target]);
    */
  }
}
