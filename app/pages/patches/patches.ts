import {Page, NavController, NavParams, Alert} from 'ionic-angular';
import {PatchPage} from '../patch/patch';

import {AlertCommon} from '../../common/alert';
import {ContextMenu} from '../../common/contextMenu';
import {SrIcon} from '../../components/sr-icon/sr-icon';


const effects = [
  {
    "name": "Calf X-Over 3 Band",
    "license": "lgpl",
    "url": "http://calf.sourceforge.net/plugins/XOver3Band",
    "maintainer": {
      "mbox": null,
      "homepage": null,
      "name": "Markus Schmidt"
    },
    "ports": {
      "control": {
        "input": [
          {
            "index": null,
            "name": "Delay 3",
            "current": 0,
            "symbol": "delay3",
            "maximum": 20,
            "enumeration": null,
            "minimum": 0,
            "toggled": null
          },
          {
            "index": null,
            "name": "Active 3",
            "current": 1,
            "symbol": "active3",
            "maximum": 1,
            "enumeration": null,
            "minimum": 0,
            "toggled": true
          },
          {
            "index": null,
            "name": "Delay 2",
            "current": 0,
            "symbol": "delay2",
            "maximum": 20,
            "enumeration": null,
            "minimum": 0,
            "toggled": null
          },
          {
            "index": null,
            "name": "Active 1",
            "current": 1,
            "symbol": "active1",
            "maximum": 1,
            "enumeration": null,
            "minimum": 0,
            "toggled": true
          },
          {
            "index": null,
            "name": "Gain 3",
            "current": 1,
            "symbol": "level3",
            "maximum": 64,
            "enumeration": null,
            "minimum": 0.015625,
            "toggled": null
          },
          {
            "index": null,
            "name": "Gain 1",
            "current": 1,
            "symbol": "level1",
            "maximum": 64,
            "enumeration": null,
            "minimum": 0.015625,
            "toggled": null
          },
          {
            "index": null,
            "name": "Delay 1",
            "current": 0,
            "symbol": "delay1",
            "maximum": 20,
            "enumeration": null,
            "minimum": 0,
            "toggled": null
          },
          {
            "index": null,
            "name": "Filter Mode",
            "current": 1,
            "symbol": "mode",
            "maximum": 2,
            "enumeration": true,
            "minimum": 0,
            "toggled": null
          },
          {
            "index": null,
            "name": "Phase 3",
            "current": 0,
            "symbol": "phase3",
            "maximum": 1,
            "enumeration": null,
            "minimum": 0,
            "toggled": true
          },
          {
            "index": null,
            "name": "Transition 1",
            "current": 150,
            "symbol": "freq0",
            "maximum": 20000,
            "enumeration": null,
            "minimum": 10,
            "toggled": null
          },
          {
            "index": null,
            "name": "Transition 2",
            "current": 3000,
            "symbol": "freq1",
            "maximum": 20000,
            "enumeration": null,
            "minimum": 10,
            "toggled": null
          },
          {
            "index": null,
            "name": "Gain",
            "current": 1,
            "symbol": "level",
            "maximum": 64,
            "enumeration": null,
            "minimum": 0.015625,
            "toggled": null
          },
          {
            "index": null,
            "name": "Phase 2",
            "current": 0,
            "symbol": "phase2",
            "maximum": 1,
            "enumeration": null,
            "minimum": 0,
            "toggled": true
          },
          {
            "index": null,
            "name": "Active 2",
            "current": 1,
            "symbol": "active2",
            "maximum": 1,
            "enumeration": null,
            "minimum": 0,
            "toggled": true
          },
          {
            "index": null,
            "name": "Phase 1",
            "current": 0,
            "symbol": "phase1",
            "maximum": 1,
            "enumeration": null,
            "minimum": 0,
            "toggled": true
          },
          {
            "index": null,
            "name": "Gain 2",
            "current": 1,
            "symbol": "level2",
            "maximum": 64,
            "enumeration": null,
            "minimum": 0.015625,
            "toggled": null
          }
        ],
        "output": [
          {
            "index": null,
            "symbol": "meter_R1",
            "name": "Level R 1"
          },
          {
            "index": null,
            "symbol": "meter_L",
            "name": "Input L"
          },
          {
            "index": null,
            "symbol": "meter_L3",
            "name": "Level L 3"
          },
          {
            "index": null,
            "symbol": "meter_R3",
            "name": "Level R 3"
          },
          {
            "index": null,
            "symbol": "meter_R2",
            "name": "Level R 2"
          },
          {
            "index": null,
            "symbol": "meter_L1",
            "name": "Level L 1"
          },
          {
            "index": null,
            "symbol": "meter_L2",
            "name": "Level L 2"
          },
          {
            "index": null,
            "symbol": "meter_R",
            "name": "Input R"
          }
        ]
      },
      "audio": {
        "input": [
          {
            "index": null,
            "symbol": "in_r",
            "name": "In R"
          },
          {
            "index": null,
            "symbol": "in_l",
            "name": "In L"
          }
        ],
        "output": [
          {
            "index": null,
            "symbol": "out_l_2",
            "name": "Out L 2"
          },
          {
            "index": null,
            "symbol": "out_l_3",
            "name": "Out L 3"
          },
          {
            "index": null,
            "symbol": "out_l",
            "name": "Out L"
          },
          {
            "index": null,
            "symbol": "out_r_3",
            "name": "Out R 3"
          },
          {
            "index": null,
            "symbol": "out_r_2",
            "name": "Out R 2"
          },
          {
            "index": null,
            "symbol": "out_r",
            "name": "Out R"
          }
        ]
      }
    },
    "developer": null
  },
  {
      "name": "Calf Rotary Speaker",
      "license": "lgpl",
      "url": "http://calf.sourceforge.net/plugins/RotarySpeaker",
      "maintainer": {
        "mbox": null,
        "homepage": null,
        "name": "Krzysztof Foltman"
      },
      "ports": {
        "control": {
          "input": [
            {
              "index": null,
              "name": "Mic Distance",
              "current": 0.7,
              "symbol": "mic_distance",
              "maximum": 1,
              "enumeration": null,
              "minimum": 0,
              "toggled": null
            },
            {
              "index": null,
              "name": "AM Depth",
              "current": 0.45,
              "symbol": "am_depth",
              "maximum": 1,
              "enumeration": null,
              "minimum": 0,
              "toggled": null
            },
            {
              "index": null,
              "name": "Test",
              "current": 0,
              "symbol": "test",
              "maximum": 1,
              "enumeration": null,
              "minimum": 0,
              "toggled": null
            },
            {
              "index": null,
              "name": "Tap Spacing",
              "current": 0.5,
              "symbol": "spacing",
              "maximum": 1,
              "enumeration": null,
              "minimum": 0,
              "toggled": null
            },
            {
              "index": null,
              "name": "FM Depth",
              "current": 0.45,
              "symbol": "mod_depth",
              "maximum": 1,
              "enumeration": null,
              "minimum": 0,
              "toggled": null
            },
            {
              "index": null,
              "name": "Bass Motor",
              "current": 30,
              "symbol": "bass_speed",
              "maximum": 600,
              "enumeration": null,
              "minimum": 10,
              "toggled": null
            },
            {
              "index": null,
              "name": "Reflection",
              "current": 0.3,
              "symbol": "reflection",
              "maximum": 1,
              "enumeration": null,
              "minimum": 0,
              "toggled": null
            },
            {
              "index": null,
              "name": "Tap Offset",
              "current": 0.5,
              "symbol": "shift",
              "maximum": 1,
              "enumeration": null,
              "minimum": 0,
              "toggled": null
            },
            {
              "index": null,
              "name": "Treble Motor",
              "current": 36,
              "symbol": "treble_speed",
              "maximum": 600,
              "enumeration": null,
              "minimum": 10,
              "toggled": null
            },
            {
              "index": null,
              "name": "Speed Mode",
              "current": 5,
              "symbol": "vib_speed",
              "maximum": 5,
              "enumeration": true,
              "minimum": 0,
              "toggled": null
            }
          ],
          "output": [
            {
              "index": null,
              "symbol": "meter_h",
              "name": "High rotor"
            },
            {
              "index": null,
              "symbol": "meter_l",
              "name": "Low rotor"
            }
          ]
        },
        "audio": {
          "input": [
            {
              "index": null,
              "symbol": "in_l",
              "name": "In L"
            },
            {
              "index": null,
              "symbol": "in_r",
              "name": "In R"
            }
          ],
          "output": [
            {
              "index": null,
              "symbol": "out_r",
              "name": "Out R"
            },
            {
              "index": null,
              "symbol": "out_l",
              "name": "Out L"
            }
          ]
        }
      },
      "developer": null
    },
  {
      "name": "Calf Phaser",
      "license": "lgpl",
      "url": "http://calf.sourceforge.net/plugins/Phaser",
      "maintainer": {
        "mbox": null,
        "homepage": null,
        "name": "Krzysztof Foltman"
      },
      "ports": {
        "control": {
          "input": [
            {
              "index": null,
              "name": "Mod rate",
              "current": 0.25,
              "symbol": "mod_rate",
              "maximum": 20,
              "enumeration": null,
              "minimum": 0.01,
              "toggled": null
            },
            {
              "index": null,
              "name": "# Stages",
              "current": 6,
              "symbol": "stages",
              "maximum": 12,
              "enumeration": null,
              "minimum": 1,
              "toggled": null
            },
            {
              "index": null,
              "name": "Reset",
              "current": 0,
              "symbol": "reset",
              "maximum": 1,
              "enumeration": null,
              "minimum": 0,
              "toggled": true
            },
            {
              "index": null,
              "name": "Dry Amount",
              "current": 1,
              "symbol": "dry",
              "maximum": 4,
              "enumeration": null,
              "minimum": 0,
              "toggled": null
            },
            {
              "index": null,
              "name": "Stereo phase",
              "current": 180,
              "symbol": "stereo",
              "maximum": 360,
              "enumeration": null,
              "minimum": 0,
              "toggled": null
            },
            {
              "index": null,
              "name": "Center Freq",
              "current": 1000,
              "symbol": "base_freq",
              "maximum": 20000,
              "enumeration": null,
              "minimum": 20,
              "toggled": null
            },
            {
              "index": null,
              "name": "Amount",
              "current": 1,
              "symbol": "amount",
              "maximum": 4,
              "enumeration": null,
              "minimum": 0,
              "toggled": null
            },
            {
              "index": null,
              "name": "Feedback",
              "current": 0.25,
              "symbol": "feedback",
              "maximum": 0.99,
              "enumeration": null,
              "minimum": -0.99,
              "toggled": null
            },
            {
              "index": null,
              "name": "Mod depth",
              "current": 4000,
              "symbol": "mod_depth",
              "maximum": 10800,
              "enumeration": null,
              "minimum": 0,
              "toggled": null
            }
          ],
          "output": []
        },
        "audio": {
          "input": [
            {
              "index": null,
              "symbol": "in_l",
              "name": "In L"
            },
            {
              "index": null,
              "symbol": "in_r",
              "name": "In R"
            }
          ],
          "output": [
            {
              "index": null,
              "symbol": "out_r",
              "name": "Out R"
            },
            {
              "index": null,
              "symbol": "out_l",
              "name": "Out L"
            }
          ]
        }
      },
      "developer": null
  }
]

@Page({
  templateUrl: 'build/pages/patches/patches.html',
  directives: [SrIcon]
})
export class PatchesPage {
  public bank : Object;

  constructor(private nav : NavController, params : NavParams) {
    //this.bank = params.get('bank');
    this.bank = {
        "index": 1,
        "name": "Shows",
        "patches": [
            {
                "name": "00 - Patch 1",
                "effects" : effects,
                "connections" : [
                    {
                        "out": "system:capture_1",
                        "in": "effect_1:bass_l"
                    },
                    {
                        "out": "effect_1:out1",
                        "in": "effect_2:input"
                    },
                    {
                        "out": "effect_2:out",
                        "in": "system:playback_1"
                    }
                ]
            },
            {
                "name": "02 - Reggae town",
                "effects" : effects,
                "connections" : [
                    {
                        "out": "system:capture_1",
                        "in": "effect_1:bass_l"
                    },
                    {
                        "out": "effect_1:out1",
                        "in": "effect_2:input"
                    },
                    {
                        "out": "effect_2:out",
                        "in": "system:playback_1"
                    }
                ]
            }
        ]
    };
  }

  createPatch() {
    let alert = AlertCommon.generate('New patch', data => this.bank["patches"].push({
      'name':data.name,
      'effects': []
    }));
    this.nav.present(alert);
  }

  itemSelected(patch) {
    this.nav.push(PatchPage, {'bank': this.bank, 'patch': patch});
  }

  onContextPatch(patch) {
    const contextMenu = new ContextMenu(patch.name, 'context');

    contextMenu.addItem('Reorder', () => {
      console.log('Beta 2.10 https://github.com/driftyco/ionic/issues/5595');
      console.log('http://codepen.io/leoz/pen/MwYxmj');
    });

    contextMenu.addItem('Remove', () => {
      const alert = AlertCommon.alert('R u sure?', () => {
        const index = this.bank["patches"].indexOf(patch);
        this.bank["patches"].splice(index, 1);
      });
      this.nav.present(alert);
    });

    contextMenu.addItem('Rename', () => {
      let alert = AlertCommon.generate('Rename patch', data => patch.name = data.name, patch.name);
      this.nav.present(alert);
    });

    //contextMenu.addItem('Copy to local', () => console.log('Cancel clicked'));

    this.nav.present(contextMenu.generate());
  }
}
