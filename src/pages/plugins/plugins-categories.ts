export class PluginsCategories {
  private categories = {
    "Amplifier": null,
    "Analyser": null,
    "Chorus": 'Humphries-guitar-pedal',
    "Compressor": 'Freepik-car-radio',
    "Delay": null,
    "Distortion": 'Humphries-guitar-pedal-2',
    "Dynamics": 'Artem-Kovyazin-Guitar-Pedal-2',
    "Equaliser": 'Freepik-equalizer-bars',
    "Expander": null,
    "Filter": 'Freepik-pedal-for-guitar',
    "Flanger": 'Freepik-equalizer-bars',
    "Gate": 'Artem-Kovyazin-Guitar-Pedal',
    "Generator": null, "Highpass": null, "Instrument": null,
    "Limiter": 'Iconic-Amplifier',
    "Lowpass": null,
    "Mixer": null,
    "Modulator": 'Black-Urco-Guitar-Pedal-MXR',
    "Multiband": null,
    "Oscillator": null, "Parametric": null,
    "Phaser": 'Freepik-pedal',
    "Pitch Shifter": 'Black-Urco-Guitar-Pedal',
    "Reverb": 'Freepik-music-recorder',
    "Simulator": 'Freepik-amplifier',
    "Spatial": null, "Spectral": null, "Utility": null,
    "Waveshaper": null
  };

  public get unlisted() {
    return [
      'Amplifier', 'Analyser', 'Expander', 'Generator', 'Instrument',
      'Oscillator', 'Highpass', 'Lowpass', 'Mixer', 'Multiband',
      'Parametric', 'Spatial', 'Spectral', 'Waveshaper',
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
