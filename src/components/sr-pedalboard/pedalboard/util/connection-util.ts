import {Pedalboard} from '../pedalboard';
import {Effect} from '../model/effect';

import * as d3 from 'd3';


export class ConnectionUtil {
  private pedalboard : Pedalboard;

  constructor(pedalboard) {
    this.pedalboard = pedalboard
  }

  elementOfPort(effect : Effect, port, type : string) {
    const effectElement = this.elementOfEffect(effect);
    const portsElements = effectElement.querySelectorAll(`.${type}-port`);

    return this.getPortInPortElements(port, portsElements);
  }

  private elementOfEffect(effect : Effect) {
    const idEffect = this.indexOf(effect);
    return this.pedalboard.effectsElements.nodes()[idEffect];
  }

  private indexOf(effect : Effect) {
    let id = 0;
    for (let otherEffect of this.pedalboard.effects) {
      if (effect.data == otherEffect.data)
        return id;

      id += 1;
    }
  }

  private getPortInPortElements(port, portElements) {
    for (let element of portElements)
      if (port == d3.select(element).data()[0])
        return element;
  }
}
