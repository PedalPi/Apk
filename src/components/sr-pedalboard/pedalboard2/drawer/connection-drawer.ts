import {Connection} from '../model/connection';
import {PortDrawer} from './port-drawer';

import * as d3 from 'd3';


export class ConnectionDrawer {

  static draw(connections : Array<Connection>, connectionsNodes) {
    // Update existing connections
    let connectionsNodesUpdated = connectionsNodes
        .data(connections, connection => connection.id)
          .style('marker-end', 'url(#end-arrow)')
          .attr("d", connection => this.resize(connection));

    // Remove old connections
    connectionsNodes.exit().remove();

    // Draw new connection
    const newConnections = connectionsNodes.enter()
      .append("path")
        .style('marker-end','url(#end-arrow)')
        .classed("link", true)
        .attr("d", connection => this.resize(connection))

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

  private static resize(connection) {
    const source = PortDrawer.positionOfPortElement(d3.select(connection.source));
    const target = PortDrawer.positionOfPortElement(d3.select(connection.target));

    return ConnectionDrawer.generateConnection(source, target);
  }

  public static generateConnection(source, target) {
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
