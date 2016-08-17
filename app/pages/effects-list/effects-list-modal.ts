import {Component} from '@angular/core';
import {ViewController, NavController, NavParams} from 'ionic-angular';

import {SrTabs} from '../../components/sr-tabs/sr-tabs';
import {SrTab} from '../../components/sr-tabs/sr-tab';

import {JsonService} from '../../service/json-service';

import {AlertCommon} from '../../common/alert';

import {effects} from './effects-list';

@Component({
  templateUrl: 'build/pages/effects-list/effects-list-modal.html',
  directives: [SrTabs, SrTab]
})
export class EffectsListModal {
  public items : any;
  public effects : any;
  public effectsByCategory : any = {};

  public categories = [];
  private jsonService : JsonService;

  constructor(private nav : NavController, params : NavParams, private controller: ViewController) {
    this.effects = effects;
    this.jsonService = params.get('jsonService');

    this.categories = [
      'All',
      'Utility', 'Mixer', 'Filter', 'Spatial', 'Generator',
      'Instrument', 'Modulator', 'Simulator',
      'Distortion', 'Reverb', 'Delay',
      'Spectral', 'Pitch Shifter', 'Dynamics',
      'Limiter', 'Equaliser', 'Parametric',
      'Multiband', 'Compressor', 'Chorus',
      'Phaser', 'Expander', 'Flanger',
      'Oscillator', 'Lowpass', 'Highpass',
      'Analyser', 'Amplifier', 'Waveshaper',
      'Gate'];
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

        for (let plugin of data.plugins) {
          for (let category of plugin.category) {
            if (this.effectsByCategory['category'] === undefined)
              this.effectsByCategory['category'] = []

            this.effectsByCategory['category'].push(plugin);
          }
        };

        this.categories = Object.keys(this.effectsByCategory);
      }
    );
  }

  close() {
    this.controller.dismiss();
  }

  getItems(event) {
    let q = event.target.value;

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
