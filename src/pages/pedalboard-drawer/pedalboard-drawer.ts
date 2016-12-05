import {Component, ViewChild} from '@angular/core';
import {NavParams} from 'ionic-angular';

import {SrPedalboard} from '../../components/sr-pedalboard/sr-pedalboard';
import {Effect} from '../../components/sr-pedalboard/pedalboard/model/effect';



@Component({
  templateUrl: 'pedalboard-drawer.html',
})
export class PedalboardDrawerPage {
  @ViewChild(SrPedalboard) pedalboardElement : SrPedalboard;
  private pedalboard : any;
  private effects : Array<Effect> = [];

  constructor(params : NavParams) {
    this.pedalboard = params.get('pedalboard');
  }

  ionViewWillEnter() {
    /*
    const effects = [
      new Effect(100, 150, effect),
      new Effect(500, 350, effect2),
      new Effect(350, 250, effect)
    ];

    for (let effect of effects)
      this.pedalboardElement.append(effect);
    */
    this.effects = Util.generateEffects(this.pedalboard)

    for (let effect of this.effects)
      this.pedalboardElement.append(effect);

    for (let connection of this.pedalboard.connections) {
      let effectSource = this.effects[connection.output.effect];
      console.log(effectSource);
      let portSource = Util.outputPort(effectSource, connection.output.symbol);
      let effectTarget = this.effects[connection.input.effect];
      console.log(effectTarget);
      let portTarget = Util.inputPort(effectTarget, connection.input.symbol);

      console.log(effectSource, portSource, effectTarget, portTarget);
      this.pedalboardElement.connect(effectSource, portSource, effectTarget, portTarget);
    }

    this.pedalboardElement.onConnectionAdded = connection => console.log('Connection added', connection);
  }

  removeSeleted() {
    console.log('AAAAAAAAA')
    this.pedalboard.removeSeleted();
  }
}

class Util {
  static generateEffects(pedalboard) : Array<Effect> {
    const effects = [];
    let i = 0;
    for (let effect of pedalboard['effects'])
      effects.push(new Effect(150 + 200 * (i++), 280, effect['pluginData']));

    return effects;
  }

  static inputPort(effect : Effect, symbol : string) {
    return this.port(effect.data.ports.audio.input, symbol);
  }

  static outputPort(effect : Effect, symbol : string) {
    return this.port(effect.data.ports.audio.output, symbol);
  }

  static port(ports : any, symbol : string) {
    return ports.filter(input => input.symbol == symbol)[0];
  }
}

const effect2 = {
  "name": "GxReverb-Stereo2",
  "label": "GxReverb-Stereo2",
  "ports": {
    "audio": {
      "output": [
        {
          "name": "Out",
          "shortName": "Out",
          "symbol": "out",
          "index": 5
        },
        {
          "name": "Out1",
          "shortName": "Out1",
          "symbol": "out1",
          "index": 6
        }
      ],
      "input": [
        {
          "name": "In",
          "shortName": "In",
          "symbol": "in",
          "index": 7
        },
        {
          "name": "In1",
          "shortName": "In1",
          "symbol": "in1",
          "index": 8
        }
      ]
    }
  }
};

const effect = {
  "name": "Stereo Reverb",
  "label": "GxReverb-Stereo",
  "ports": {
    "audio": {
      "output": [
        {
          "name": "Out",
          "shortName": "Out",
          "symbol": "out",
          "index": 5
        },
        {
          "name": "Out1",
          "shortName": "Out1",
          "symbol": "out1",
          "index": 6
        },
        {
          "name": "Out2",
          "shortName": "Out2",
          "symbol": "out2",
          "index": 6
        }
      ],
      "input": [
        {
          "name": "In",
          "shortName": "In",
          "symbol": "in",
          "index": 7
        },
        {
          "name": "In1",
          "shortName": "In1",
          "symbol": "in1",
          "index": 8
        }
      ]
    }
  }
};
