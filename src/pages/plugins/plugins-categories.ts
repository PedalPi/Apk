export class PluginsCategories {
  private categories = {
    "Amplifier": null, "Analyser": null,
    "Chorus": 'Humphries-guitar-pedal',
    "Compressor": 'Freepik-car-radio',
    "Delay": null,
    "Distortion": 'Humphries-guitar-pedal-2',
    "Dynamics": 'Freepik-pedal',
    "Equaliser": 'Freepik-equalizer-bars',
    "Expander": null,
    "Filter": null,
    "Flanger": 'Freepik-equalizer-bars',
    "Gate": null,
    "Generator": null, "Highpass": null, "Instrument": null,
    "Limiter": null, "Lowpass": null, "Mixer": null,
    "Modulator": null, "Multiband": null,
    "Oscillator": null, "Parametric": null,
    "Phaser": 'Freepik-pedal',
    "Pitch Shifter": null,
    "Reverb": 'Freepik-music-recorder',
    "Simulator": null,
    "Spatial": null, "Spectral": null, "Utility": null,
    "Waveshaper": null
  };

  public get unlisted() {
    return [
      'Analyser', 'Expander', 'Generator', 'Instrument', 'Oscillator',
      'Highpass', 'Lowpass', 'Multiband', 'Parametric', 'Spectral',
      'Waveshaper',
    ];
  }

  public get all() {
    return Object.keys(this.categories);
  }

  public get filtered() {
    return this.all.filter((current) => this.unlisted.indexOf(current) === -1);
  }

  public parse(category) {
    return category.toLocaleLowerCase().replace(/\s/g, "-");
  }

  public icon(category) {
    return this.categories[category];
  }
}
