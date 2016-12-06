import {Pedalboard} from '../pedalboard';
import {Effect} from '../model/effect';

import * as d3 from 'd3';


export class ConnectionUtil {
  private pedalboard : Pedalboard;

  constructor(pedalboard) {
    this.pedalboard = pedalboard
  }

  elementOfPort(effect : Effect, port, type : string) {
    let effectElement = this.elementOfEffect(effect);
    if (effectElement == undefined) // FIXME - gambiarra
      effectElement = this.pedalboard.systemEffectElement.node();

    const portsElements = effectElement.querySelectorAll(`.${type}-port`);

    return this.getPortInPortElements(port, portsElements);
  }

  private elementOfEffect(effect : Effect) {
    const idEffect = this.indexOf(effect);
    return this.pedalboard.effectsElements.nodes()[idEffect];
  }

  private indexOf(effect : Effect) {
    return this.pedalboard.effects.findIndex(otherEffect => effect.data == otherEffect.data);
  }

  private getPortInPortElements(port, portElements) {
    for (let element of portElements)
      if (port == d3.select(element).data()[0])
        return element;
  }
}
