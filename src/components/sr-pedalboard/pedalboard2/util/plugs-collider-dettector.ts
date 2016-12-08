import {Output} from '../model/plug';

/** Based in http://jsfiddle.net/AkPN2/5/ */
export class PlugsColliderDettector {

  static dettectCollision(output : Output, connectionsTarget : Array<any>, mousePosition : {x, y}) {
    const mouseCirclePosition = this.circle(mousePosition);
    return this.getColidedWith(mouseCirclePosition, connectionsTarget);
  }

  private static getColidedWith(position, nodes) {
    let collided = nodes.filter(input => {
      const nodePosition = this.circleByElement(input);
      return this.hasColision(nodePosition, position);
    });

    return collided.size() == 0 ? null : collided.data()[0];
  }

  private static circleByElement(plug) {
    const position = plug.position;
    return this.circle(position, plug.view.attr('r'));
  }

  private static circle(position : {x, y}, r="1") {
    return { 'cx': parseInt(position.x), 'cy': parseInt(position.y), 'r': parseInt(r) };
  }

  private static hasColision(c1, c2) {
    let distance = Math.sqrt(
      Math.pow(c2.cx - c1.cx, 2) +
      Math.pow(c2.cy - c1.cy, 2)
    );

    return distance < (c1.r + c2.r);
  }
}
