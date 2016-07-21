import {Page, ViewController, NavController, NavParams} from 'ionic-angular';

import {SrTabs} from '../../components/sr-tabs/sr-tabs';
import {SrTab} from '../../components/sr-tabs/sr-tab';

import {JsonService} from '../../service/jsonService';

import {AlertCommon} from '../../common/alert';

const afe = {effects :
  [{
    "name" : "http://guitarix.sourceforge.net/plugins/gx_studiopre_st#studiopre_st",
    "ports": {
      "Bass_R": {
        "Name": "Bass_R",
        "Default": "0.500000",
        "Symbol": "bass_r",
        "Maximum": "1.000000",
        "Minimum": "0.000000",
        "Type": [
          "http://lv2plug.in/ns/lv2core#ControlPort",
          "http://lv2plug.in/ns/lv2core#InputPort"
        ]
      },
      "Out1": {
        "Symbol": "out1",
        "Type": [
          "http://lv2plug.in/ns/lv2core#AudioPort",
          "http://lv2plug.in/ns/lv2core#OutputPort"
        ],
        "Name": "Out1"
      },
      "Treble_L": {
        "Name": "Treble_L",
        "Default": "0.500000",
        "Symbol": "treble_l",
        "Maximum": "1.000000",
        "Minimum": "0.000000",
        "Type": [
          "http://lv2plug.in/ns/lv2core#ControlPort",
          "http://lv2plug.in/ns/lv2core#InputPort"
        ]
      },
      "Middle_L": {
        "Name": "Middle_L",
        "Default": "0.500000",
        "Symbol": "middle_l",
        "Maximum": "1.000000",
        "Minimum": "0.000000",
        "Type": [
          "http://lv2plug.in/ns/lv2core#ControlPort",
          "http://lv2plug.in/ns/lv2core#InputPort"
        ]
      },
      "Bright_L": {
        "Name": "Bright_L",
        "Default": "0.000000",
        "Symbol": "bright_r",
        "Maximum": "1.000000",
        "Minimum": "0.000000",
        "Type": [
          "http://lv2plug.in/ns/lv2core#ControlPort",
          "http://lv2plug.in/ns/lv2core#InputPort"
        ],
        "Properties": [
          "http://lv2plug.in/ns/lv2core#integer",
          "http://lv2plug.in/ns/lv2core#enumeration"
        ]
      },
      "Volume_R": {
        "Name": "Volume_R",
        "Default": "5.000000",
        "Symbol": "volume_r",
        "Maximum": "20.000000",
        "Minimum": "0.000000",
        "Type": [
          "http://lv2plug.in/ns/lv2core#ControlPort",
          "http://lv2plug.in/ns/lv2core#InputPort"
        ]
      },
      "Volume_L": {
        "Name": "Volume_L",
        "Default": "5.000000",
        "Symbol": "volume_l",
        "Maximum": "20.000000",
        "Minimum": "0.000000",
        "Type": [
          "http://lv2plug.in/ns/lv2core#ControlPort",
          "http://lv2plug.in/ns/lv2core#InputPort"
        ]
      },
      "Middle_R": {
        "Name": "Middle_R",
        "Default": "0.500000",
        "Symbol": "middle_r",
        "Maximum": "1.000000",
        "Minimum": "0.000000",
        "Type": [
          "http://lv2plug.in/ns/lv2core#ControlPort",
          "http://lv2plug.in/ns/lv2core#InputPort"
        ]
      },
      "In1": {
        "Symbol": "in1",
        "Type": [
          "http://lv2plug.in/ns/lv2core#AudioPort",
          "http://lv2plug.in/ns/lv2core#InputPort"
        ],
        "Name": "In1"
      },
      "In": {
        "Symbol": "in",
        "Type": [
          "http://lv2plug.in/ns/lv2core#AudioPort",
          "http://lv2plug.in/ns/lv2core#InputPort"
        ],
        "Name": "In"
      },
      "Treble_R": {
        "Name": "Treble_R",
        "Default": "0.500000",
        "Symbol": "treble_r",
        "Maximum": "1.000000",
        "Minimum": "0.000000",
        "Type": [
          "http://lv2plug.in/ns/lv2core#ControlPort",
          "http://lv2plug.in/ns/lv2core#InputPort"
        ]
      },
      "Bass_L": {
        "Name": "Bass_L",
        "Default": "0.500000",
        "Symbol": "bass_l",
        "Maximum": "1.000000",
        "Minimum": "0.000000",
        "Type": [
          "http://lv2plug.in/ns/lv2core#ControlPort",
          "http://lv2plug.in/ns/lv2core#InputPort"
        ]
      },
      "Out": {
        "Symbol": "out",
        "Type": [
          "http://lv2plug.in/ns/lv2core#AudioPort",
          "http://lv2plug.in/ns/lv2core#OutputPort"
        ],
        "Name": "Out"
      }
    }
  },
  {
    "name": "http://calf.sourceforge.net/plugins/Gate",
    "ports": {
      "Makeup Gain": {
        "Name": "Makeup Gain",
        "Default": "1.000000",
        "Symbol": "makeup",
        "Maximum": "64.000000",
        "Minimum": "1.000000",
        "Type": [
          "http://lv2plug.in/ns/lv2core#ControlPort",
          "http://lv2plug.in/ns/lv2core#InputPort"
        ],
        "Properties": "http://lv2plug.in/ns/ext/port-props#hasStrictBounds"
      },
      "In R": {
        "Group": "http://calf.sourceforge.net/plugins/Gate#in",
        "Symbol": "in_r",
        "Type": [
          "http://lv2plug.in/ns/lv2core#AudioPort",
          "http://lv2plug.in/ns/lv2core#InputPort"
        ],
        "Name": "In R",
        "Designation": "http://lv2plug.in/ns/ext/port-groups#right"
      },
      "Ratio": {
        "Name": "Ratio",
        "Default": "2.000000",
        "Symbol": "ratio",
        "Maximum": "20.000000",
        "Minimum": "1.000000",
        "Type": [
          "http://lv2plug.in/ns/lv2core#ControlPort",
          "http://lv2plug.in/ns/lv2core#InputPort"
        ],
        "Properties": "http://lv2plug.in/ns/ext/port-props#hasStrictBounds"
      },
      "Gating": {
        "Name": "Gating",
        "Default": "nan",
        "Symbol": "gating",
        "Maximum": "1.000000",
        "Minimum": "0.031250",
        "Type": [
          "http://lv2plug.in/ns/lv2core#ControlPort",
          "http://lv2plug.in/ns/lv2core#OutputPort"
        ],
        "Properties": [
          "http://lv2plug.in/ns/ext/port-props#hasStrictBounds",
          "http://lv2plug.in/ns/lv2core#connectionOptional"
        ]
      },
      "Max Gain Reduction": {
        "Name": "Max Gain Reduction",
        "Default": "0.061250",
        "Symbol": "range",
        "Maximum": "1.000000",
        "Minimum": "0.000016",
        "Type": [
          "http://lv2plug.in/ns/lv2core#ControlPort",
          "http://lv2plug.in/ns/lv2core#InputPort"
        ],
        "Properties": "http://lv2plug.in/ns/ext/port-props#hasStrictBounds"
      },
      "Out R": {
        "Group": "http://calf.sourceforge.net/plugins/Gate#out",
        "Symbol": "out_r",
        "Type": [
          "http://lv2plug.in/ns/lv2core#AudioPort",
          "http://lv2plug.in/ns/lv2core#OutputPort"
        ],
        "Name": "Out R",
        "Designation": "http://lv2plug.in/ns/ext/port-groups#right"
      },
      "0dB-In": {
        "Name": "0dB-In",
        "Default": "nan",
        "Symbol": "clip_in",
        "Maximum": "1.000000",
        "Minimum": "0.000000",
        "Type": [
          "http://lv2plug.in/ns/lv2core#ControlPort",
          "http://lv2plug.in/ns/lv2core#OutputPort"
        ],
        "Properties": [
          "http://lv2plug.in/ns/ext/port-props#hasStrictBounds",
          "http://lv2plug.in/ns/lv2core#connectionOptional",
          "http://lv2plug.in/ns/lv2core#toggled"
        ]
      },
      "Attack": {
        "Name": "Attack",
        "Default": "20.000000",
        "Symbol": "attack",
        "Maximum": "2000.000000",
        "Minimum": "0.010000",
        "Type": [
          "http://lv2plug.in/ns/lv2core#ControlPort",
          "http://lv2plug.in/ns/lv2core#InputPort"
        ],
        "Properties": [
          "http://lv2plug.in/ns/ext/port-props#hasStrictBounds",
          "http://lv2plug.in/ns/ext/port-props#logarithmic"
        ]
      },
      "Stereo Link": {
        "Scale": {
          "0": "Average",
          "1": "Maximum"
        },
        "Name": "Stereo Link",
        "Default": "0.000000",
        "Symbol": "stereo_link",
        "Maximum": "1.000000",
        "Minimum": "0.000000",
        "Type": [
          "http://lv2plug.in/ns/lv2core#ControlPort",
          "http://lv2plug.in/ns/lv2core#InputPort"
        ],
        "Properties": [
          "http://lv2plug.in/ns/lv2core#enumeration",
          "http://lv2plug.in/ns/ext/port-props#hasStrictBounds",
          "http://lv2plug.in/ns/lv2core#integer"
        ]
      },
      "Detection": {
        "Scale": {
          "0": "RMS",
          "1": "Peak"
        },
        "Name": "Detection",
        "Default": "0.000000",
        "Symbol": "detection",
        "Maximum": "1.000000",
        "Minimum": "0.000000",
        "Type": [
          "http://lv2plug.in/ns/lv2core#ControlPort",
          "http://lv2plug.in/ns/lv2core#InputPort"
        ],
        "Properties": [
          "http://lv2plug.in/ns/lv2core#integer",
          "http://lv2plug.in/ns/lv2core#enumeration",
          "http://lv2plug.in/ns/ext/port-props#hasStrictBounds"
        ]
      },
      "Release": {
        "Name": "Release",
        "Default": "250.000000",
        "Symbol": "release",
        "Maximum": "2000.000000",
        "Minimum": "0.010000",
        "Type": [
          "http://lv2plug.in/ns/lv2core#ControlPort",
          "http://lv2plug.in/ns/lv2core#InputPort"
        ],
        "Properties": [
          "http://lv2plug.in/ns/ext/port-props#logarithmic",
          "http://lv2plug.in/ns/ext/port-props#hasStrictBounds"
        ]
      },
      "0dB-Out": {
        "Name": "0dB-Out",
        "Default": "nan",
        "Symbol": "clip_out",
        "Maximum": "1.000000",
        "Minimum": "0.000000",
        "Type": [
          "http://lv2plug.in/ns/lv2core#ControlPort",
          "http://lv2plug.in/ns/lv2core#OutputPort"
        ],
        "Properties": [
          "http://lv2plug.in/ns/ext/port-props#hasStrictBounds",
          "http://lv2plug.in/ns/lv2core#connectionOptional",
          "http://lv2plug.in/ns/lv2core#toggled"
        ]
      },
      "In L": {
        "Group": "http://calf.sourceforge.net/plugins/Gate#in",
        "Symbol": "in_l",
        "Type": [
          "http://lv2plug.in/ns/lv2core#AudioPort",
          "http://lv2plug.in/ns/lv2core#InputPort"
        ],
        "Name": "In L",
        "Designation": "http://lv2plug.in/ns/ext/port-groups#left"
      },
      "Bypass": {
        "Name": "Bypass",
        "Default": "0.000000",
        "Symbol": "bypass",
        "Maximum": "1.000000",
        "Minimum": "0.000000",
        "Type": [
          "http://lv2plug.in/ns/lv2core#InputPort",
          "http://lv2plug.in/ns/lv2core#ControlPort"
        ],
        "Properties": [
          "http://lv2plug.in/ns/ext/port-props#hasStrictBounds",
          "http://lv2plug.in/ns/lv2core#toggled"
        ]
      },
      "Output": {
        "Name": "Output",
        "Default": "nan",
        "Symbol": "meter_out",
        "Maximum": "1.000000",
        "Minimum": "0.000000",
        "Type": [
          "http://lv2plug.in/ns/lv2core#ControlPort",
          "http://lv2plug.in/ns/lv2core#OutputPort"
        ],
        "Properties": [
          "http://lv2plug.in/ns/lv2core#connectionOptional",
          "http://lv2plug.in/ns/ext/port-props#hasStrictBounds"
        ]
      },
      "Threshold": {
        "Name": "Threshold",
        "Default": "0.125000",
        "Symbol": "threshold",
        "Maximum": "1.000000",
        "Minimum": "0.000977",
        "Type": [
          "http://lv2plug.in/ns/lv2core#ControlPort",
          "http://lv2plug.in/ns/lv2core#InputPort"
        ],
        "Properties": "http://lv2plug.in/ns/ext/port-props#hasStrictBounds"
      },
      "Input": {
        "Name": "Input",
        "Default": "nan",
        "Symbol": "meter_in",
        "Maximum": "1.000000",
        "Minimum": "0.000000",
        "Type": [
          "http://lv2plug.in/ns/lv2core#OutputPort",
          "http://lv2plug.in/ns/lv2core#ControlPort"
        ],
        "Properties": [
          "http://lv2plug.in/ns/lv2core#connectionOptional",
          "http://lv2plug.in/ns/ext/port-props#hasStrictBounds"
        ]
      },
      "Knee": {
        "Name": "Knee",
        "Default": "2.828430",
        "Symbol": "knee",
        "Maximum": "8.000000",
        "Minimum": "1.000000",
        "Type": [
          "http://lv2plug.in/ns/lv2core#ControlPort",
          "http://lv2plug.in/ns/lv2core#InputPort"
        ],
        "Properties": "http://lv2plug.in/ns/ext/port-props#hasStrictBounds"
      },
      "Out L": {
        "Group": "http://calf.sourceforge.net/plugins/Gate#out",
        "Symbol": "out_l",
        "Type": [
          "http://lv2plug.in/ns/lv2core#AudioPort",
          "http://lv2plug.in/ns/lv2core#OutputPort"
        ],
        "Name": "Out L",
        "Designation": "http://lv2plug.in/ns/ext/port-groups#left"
      }
    }
  }, {
    "name":"http://calf.sourceforge.net/plugins/Pulsator",
    "ports": {
      "Meter-InR": {
        "Name": "Meter-InR",
        "Default": "nan",
        "Symbol": "meter_inR",
        "Maximum": "1.000000",
        "Minimum": "0.000000",
        "Type": [
          "http://lv2plug.in/ns/lv2core#ControlPort",
          "http://lv2plug.in/ns/lv2core#OutputPort"
        ],
        "Properties": [
          "http://lv2plug.in/ns/lv2core#connectionOptional",
          "http://lv2plug.in/ns/ext/port-props#hasStrictBounds"
        ]
      },
      "Meter-OutR": {
        "Name": "Meter-OutR",
        "Default": "nan",
        "Symbol": "meter_outR",
        "Maximum": "1.000000",
        "Minimum": "0.000000",
        "Type": [
          "http://lv2plug.in/ns/lv2core#ControlPort",
          "http://lv2plug.in/ns/lv2core#OutputPort"
        ],
        "Properties": [
          "http://lv2plug.in/ns/ext/port-props#hasStrictBounds",
          "http://lv2plug.in/ns/lv2core#connectionOptional"
        ]
      },
      "In R": {
        "Group": "http://calf.sourceforge.net/plugins/Pulsator#in",
        "Symbol": "in_r",
        "Type": [
          "http://lv2plug.in/ns/lv2core#InputPort",
          "http://lv2plug.in/ns/lv2core#AudioPort"
        ],
        "Name": "In R",
        "Designation": "http://lv2plug.in/ns/ext/port-groups#right"
      },
      "0dB-OutR": {
        "Name": "0dB-OutR",
        "Default": "nan",
        "Symbol": "clip_outR",
        "Maximum": "1.000000",
        "Minimum": "0.000000",
        "Type": [
          "http://lv2plug.in/ns/lv2core#ControlPort",
          "http://lv2plug.in/ns/lv2core#OutputPort"
        ],
        "Properties": [
          "http://lv2plug.in/ns/ext/port-props#hasStrictBounds",
          "http://lv2plug.in/ns/lv2core#connectionOptional"
        ]
      },
      "Modulation": {
        "Name": "Modulation",
        "Default": "1.000000",
        "Symbol": "amount",
        "Maximum": "1.000000",
        "Minimum": "0.000000",
        "Type": [
          "http://lv2plug.in/ns/lv2core#ControlPort",
          "http://lv2plug.in/ns/lv2core#InputPort"
        ],
        "Properties": "http://lv2plug.in/ns/ext/port-props#hasStrictBounds"
      },
      "0dB-InL": {
        "Name": "0dB-InL",
        "Default": "nan",
        "Symbol": "clip_inL",
        "Maximum": "1.000000",
        "Minimum": "0.000000",
        "Type": [
          "http://lv2plug.in/ns/lv2core#ControlPort",
          "http://lv2plug.in/ns/lv2core#OutputPort"
        ],
        "Properties": [
          "http://lv2plug.in/ns/ext/port-props#hasStrictBounds",
          "http://lv2plug.in/ns/lv2core#connectionOptional"
        ]
      },
      "Out R": {
        "Group": "http://calf.sourceforge.net/plugins/Pulsator#out",
        "Symbol": "out_r",
        "Type": [
          "http://lv2plug.in/ns/lv2core#AudioPort",
          "http://lv2plug.in/ns/lv2core#OutputPort"
        ],
        "Name": "Out R",
        "Designation": "http://lv2plug.in/ns/ext/port-groups#right"
      },
      "Mono-in": {
        "Name": "Mono-in",
        "Default": "0.000000",
        "Symbol": "mono",
        "Maximum": "1.000000",
        "Minimum": "0.000000",
        "Type": [
          "http://lv2plug.in/ns/lv2core#InputPort",
          "http://lv2plug.in/ns/lv2core#ControlPort"
        ],
        "Properties": [
          "http://lv2plug.in/ns/lv2core#toggled",
          "http://lv2plug.in/ns/ext/port-props#hasStrictBounds"
        ]
      },
      "Input Gain": {
        "Name": "Input Gain",
        "Designation": "http://lv2plug.in/ns/ext/parameters#gain",
        "Default": "1.000000",
        "Symbol": "level_in",
        "Maximum": "64.000000",
        "Minimum": "0.015625",
        "Type": [
          "http://lv2plug.in/ns/lv2core#ControlPort",
          "http://lv2plug.in/ns/lv2core#InputPort"
        ]
      },
      "Offset L/R": {
        "Name": "Offset L/R",
        "Default": "0.500000",
        "Symbol": "offset",
        "Maximum": "1.000000",
        "Minimum": "0.000000",
        "Type": [
          "http://lv2plug.in/ns/lv2core#ControlPort",
          "http://lv2plug.in/ns/lv2core#InputPort"
        ],
        "Properties": "http://lv2plug.in/ns/ext/port-props#hasStrictBounds"
      },
      "Output Gain": {
        "Name": "Output Gain",
        "Designation": "http://lv2plug.in/ns/ext/parameters#gain",
        "Default": "1.000000",
        "Symbol": "level_out",
        "Maximum": "64.000000",
        "Minimum": "0.015625",
        "Type": [
          "http://lv2plug.in/ns/lv2core#ControlPort",
          "http://lv2plug.in/ns/lv2core#InputPort"
        ]
      },
      "Frequency": {
        "Name": "Frequency",
        "Default": "1.000000",
        "Symbol": "freq",
        "Maximum": "100.000000",
        "Minimum": "0.010000",
        "Type": [
          "http://lv2plug.in/ns/lv2core#ControlPort",
          "http://lv2plug.in/ns/lv2core#InputPort"
        ],
        "Properties": [
          "http://lv2plug.in/ns/ext/port-props#hasStrictBounds",
          "http://lv2plug.in/ns/ext/port-props#logarithmic"
        ]
      },
      "Meter-OutL": {
        "Name": "Meter-OutL",
        "Default": "nan",
        "Symbol": "meter_outL",
        "Maximum": "1.000000",
        "Minimum": "0.000000",
        "Type": [
          "http://lv2plug.in/ns/lv2core#ControlPort",
          "http://lv2plug.in/ns/lv2core#OutputPort"
        ],
        "Properties": [
          "http://lv2plug.in/ns/lv2core#connectionOptional",
          "http://lv2plug.in/ns/ext/port-props#hasStrictBounds"
        ]
      },
      "In L": {
        "Group": "http://calf.sourceforge.net/plugins/Pulsator#in",
        "Symbol": "in_l",
        "Type": [
          "http://lv2plug.in/ns/lv2core#InputPort",
          "http://lv2plug.in/ns/lv2core#AudioPort"
        ],
        "Name": "In L",
        "Designation": "http://lv2plug.in/ns/ext/port-groups#left"
      },
      "Bypass": {
        "Name": "Bypass",
        "Default": "0.000000",
        "Symbol": "bypass",
        "Maximum": "1.000000",
        "Minimum": "0.000000",
        "Type": [
          "http://lv2plug.in/ns/lv2core#InputPort",
          "http://lv2plug.in/ns/lv2core#ControlPort"
        ],
        "Properties": [
          "http://lv2plug.in/ns/ext/port-props#hasStrictBounds",
          "http://lv2plug.in/ns/lv2core#toggled"
        ]
      },
      "Reset": {
        "Name": "Reset",
        "Default": "0.000000",
        "Symbol": "reset",
        "Maximum": "1.000000",
        "Minimum": "0.000000",
        "Type": [
          "http://lv2plug.in/ns/lv2core#ControlPort",
          "http://lv2plug.in/ns/lv2core#InputPort"
        ],
        "Properties": [
          "http://lv2plug.in/ns/ext/port-props#trigger",
          "http://lv2plug.in/ns/ext/port-props#hasStrictBounds",
          "http://lv2plug.in/ns/lv2core#toggled"
        ]
      },
      "Mode": {
        "Scale": {
          "0": "Sine",
          "1": "Triangle",
          "2": "Square",
          "3": "Saw up",
          "4": "Saw down"
        },
        "Name": "Mode",
        "Default": "0.000000",
        "Symbol": "mode",
        "Maximum": "4.000000",
        "Minimum": "0.000000",
        "Type": [
          "http://lv2plug.in/ns/lv2core#ControlPort",
          "http://lv2plug.in/ns/lv2core#InputPort"
        ],
        "Properties": [
          "http://lv2plug.in/ns/ext/port-props#hasStrictBounds",
          "http://lv2plug.in/ns/lv2core#integer",
          "http://lv2plug.in/ns/lv2core#enumeration"
        ]
      },
      "0dB-OutL": {
        "Name": "0dB-OutL",
        "Default": "nan",
        "Symbol": "clip_outL",
        "Maximum": "1.000000",
        "Minimum": "0.000000",
        "Type": [
          "http://lv2plug.in/ns/lv2core#ControlPort",
          "http://lv2plug.in/ns/lv2core#OutputPort"
        ],
        "Properties": [
          "http://lv2plug.in/ns/lv2core#connectionOptional",
          "http://lv2plug.in/ns/ext/port-props#hasStrictBounds"
        ]
      },
      "0dB-InR": {
        "Name": "0dB-InR",
        "Default": "nan",
        "Symbol": "clip_inR",
        "Maximum": "1.000000",
        "Minimum": "0.000000",
        "Type": [
          "http://lv2plug.in/ns/lv2core#ControlPort",
          "http://lv2plug.in/ns/lv2core#OutputPort"
        ],
        "Properties": [
          "http://lv2plug.in/ns/lv2core#connectionOptional",
          "http://lv2plug.in/ns/ext/port-props#hasStrictBounds"
        ]
      },
      "Meter-InL": {
        "Name": "Meter-InL",
        "Default": "nan",
        "Symbol": "meter_inL",
        "Maximum": "1.000000",
        "Minimum": "0.000000",
        "Type": [
          "http://lv2plug.in/ns/lv2core#ControlPort",
          "http://lv2plug.in/ns/lv2core#OutputPort"
        ],
        "Properties": [
          "http://lv2plug.in/ns/ext/port-props#hasStrictBounds",
          "http://lv2plug.in/ns/lv2core#connectionOptional"
        ]
      },
      "Out L": {
        "Group": "http://calf.sourceforge.net/plugins/Pulsator#out",
        "Symbol": "out_l",
        "Type": [
          "http://lv2plug.in/ns/lv2core#OutputPort",
          "http://lv2plug.in/ns/lv2core#AudioPort"
        ],
        "Name": "Out L",
        "Designation": "http://lv2plug.in/ns/ext/port-groups#left"
      }
    }
  }
]};

@Page({
  templateUrl: 'build/pages/effectList/effectList.html',
  directives: [SrTabs, SrTab]
})
export class EffectListPage {
  public items : any;
  public effects : any;
  public searchQuery : string = '';

  constructor(private nav : NavController, params : NavParams, private controller: ViewController, private jsonService : JsonService) {
    this.effects = afe.effects;
  }

  private get service() {
      return this.jsonService.plugin;
  }

  ngOnInit() {
    //https://github.com/mozilla/localForage
    this.service.getPlugins().subscribe(
      data => {
        this.effects = data.plugins.sort((a, b) => a.name.localeCompare(b.name));
        this.items = this.effects;
      }
    );
  }

  close() {
    this.controller.dismiss();
  }

  getItems(searchbar) {
    let q = searchbar.value;

    if (q.trim() == '') {
      this.items = this.effects;
      return;
    }

    this.items = this.effects.filter(v => v.name.toLowerCase().indexOf(q.toLowerCase()) > -1)
  }

  itemSelected(effect) {
    for (let parameter of effect.ports.control.input) {
      parameter["current"] = parameter["default"];
      delete parameter["default"];
    }

    this.controller.dismiss(effect);
  }
}
