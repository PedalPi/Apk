import {Page, NavController, NavParams, Alert} from 'ionic-angular';
import {PatchPage} from '../patch/patch';

import {AlertCommon} from '../../common/alert';
import {ContextMenu} from '../../common/contextMenu';

@Page({
  templateUrl: 'build/pages/patches/patches.html'
})
export class PatchesPage {
  private nav : NavController;
  private params : NavParams;
  public bank : Object;

  constructor(nav : NavController, params : NavParams) {
    this.nav = nav;
    //this.bank = params.get('bank');
    this.bank = {
        "index": 1,
        "name": "Shows",
        "patches": [
            {
                "name": "Shows",
                "effects" : [
                    {
                        "name": "Distortion drive",
                        "company": "MOD",
                        "params": [
                            {
                                "name": "ratio",
                                "min": 0,
                                "max": 10,
                                "current": 5
                            },
                            {
                                "name": "volume",
                                "min": 0,
                                "max": 100,
                                "current": 5,
                                "unit": "%"
                            }
                        ],
                        "active" : false
                    },
                    {
                        "name": "Test drive",
                        "company": "Guitarix",
                        "params": [
                            {
                                "name": "speed",
                                "min": 5,
                                "max": 10,
                                "current": 7
                            },
                            {
                                "name": "drive",
                                "min": 50,
                                "max": 100,
                                "current": 57,
                                "unit": "%"
                            },
                            {
                                "name": "gain",
                                "min": -50,
                                "max": 50,
                                "current": 0,
                                "unit": "db"
                            }
                        ],
                        "active" : true
                    }
                ],
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
                "name": "Shows2",
                "effects" : [
                    {
                        "name": "Distortion drive",
                        "company": "MOD",
                        "params": [
                            {
                                "name": "ratio",
                                "min": 0,
                                "max": 10,
                                "current": 5
                            },
                            {
                                "name": "volume",
                                "min": 0,
                                "max": 100,
                                "current": 5,
                                "unit": "%"
                            }
                        ],
                        "active" : false
                    },
                    {
                        "name": "Test drive",
                        "company": "Guitarix",
                        "params": [
                            {
                                "name": "ratio",
                                "min": 0,
                                "max": 10,
                                "current": 5
                            },
                            {
                                "name": "volume",
                                "min": 0,
                                "max": 100,
                                "current": 5,
                                "unit": "%"
                            }
                        ],
                        "active" : true
                    }
                ],
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
                "name": "Shows3",
                "effects" : [
                    {
                        "name": "Distortion drive",
                        "company": "MOD",
                        "params": [
                            {
                                "name": "ratio",
                                "min": 0,
                                "max": 10,
                                "current": 5
                            },
                            {
                                "name": "volume",
                                "min": 0,
                                "max": 100,
                                "current": 5,
                                "unit": "%"
                            }
                        ],
                        "active" : false
                    },
                    {
                        "name": "Test drive",
                        "company": "Guitarix",
                        "params": [
                            {
                                "name": "ratio",
                                "min": 0,
                                "max": 10,
                                "current": 5
                            },
                            {
                                "name": "volume",
                                "min": 0,
                                "max": 100,
                                "current": 5,
                                "unit": "%"
                            }
                        ],
                        "active" : true
                    }
                ],
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
    let alert = AlertCommon.generate('New patch', data => this.bank["patches"].push({'name':data.name}));
    this.nav.present(alert);
  }

  itemSelected(bank, patch) {
    this.nav.push(PatchPage, {'bank': bank, 'patch': patch});
  }

  onContextPatch(patch) {
    const contextMenu = new ContextMenu(patch.name, 'context');

    contextMenu.addItem('Reorder', () => {
      console.log('Beta 2.10 https://github.com/driftyco/ionic/issues/5595');
      console.log('http://codepen.io/leoz/pen/MwYxmj');
    });

    contextMenu.addItem('Remove', () => {
      console.log('Destructive clicked');
      console.log('https://github.com/driftyco/ionic/issues/5073');
    });

    contextMenu.addItem('Rename', () => {
      let alert = AlertCommon.generate('Rename patch', data => patch.name = data.name, patch.name);
      this.nav.present(alert);
    });

    //contextMenu.addItem('Copy to local', () => console.log('Cancel clicked'));

    this.nav.present(contextMenu.generate());
  }
}
