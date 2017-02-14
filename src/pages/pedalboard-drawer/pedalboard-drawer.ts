import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {PedalboardPage} from '../pedalboard/pedalboard';
import {JsonService} from '../../providers/json/json-service';

import {SrPedalboard} from '../../components/sr-pedalboard/sr-pedalboard';
import {Effect} from '../../components/sr-pedalboard/pedalboard/model/effect';

import {Pedalboard} from '../../plugins-manager/model/pedalboard';
import {Lv2Effect} from '../../plugins-manager/model/lv2/lv2-effect';
import {Connection} from '../../plugins-manager/model/connection';

import {DataService} from '../../providers/data/data-service';

import {SrPedalboardFacade} from './sr-pedalboard-facade';
import {PluginsPage} from '../plugins/plugins';


@Component({
  templateUrl: 'pedalboard-drawer.html',
})
export class PedalboardDrawerPage {
  @ViewChild(SrPedalboard) pedalboardElement : SrPedalboard;
  private pedalboard : any;

  constructor(
      private nav : NavController,
      params : NavParams,
      data : DataService,
      private jsonService : JsonService
  ) {
    this.pedalboard = params.get('pedalboard');
  }

  private get service() {
    return this.jsonService.pedalboard;
  }

  ionViewDidLoad() {
    new SrPedalboardFacade(this.pedalboardElement, this.pedalboard).load()

    this.pedalboardElement.onEffectMoved = effect => this.savePedalboardData();
    this.pedalboardElement.onEffectDoubleClick = effect => this.goToEffects(effect);

    this.pedalboardElement.onConnectionAdded = connection => console.log('Connection added', connection);
    this.pedalboardElement.onEffectRemoved = effect => this.removeEffect(effect);
  }

  removeSeleted() {
    this.pedalboardElement.removeSeleted();
  }

  goToEffects(effect?) {
    const params = {
      'pedalboard': this.pedalboard
    }
    if (effect)
      params['effect'] = effect.identifier

    this.nav.push(PedalboardPage, params, {animate: false});
  }

  addEffect() {
    const goTo = (resolve, reject) => this.nav.push(PluginsPage, {resolve: resolve})

    new Promise(goTo).then(data => alert('Recebi da tela 2: ' + data))
  }

  private savePedalboardData() {
    const data = { effectPositions: this.pedalboardElement.effectPositions }
    this.pedalboard.data = {'pedalpi-apk': data};

    this.service.updateData(this.pedalboard, data).subscribe();
  }

  private removeEffect(effect) {
    const effectIndex = this.pedalboard.effects.indexOf(effect.identifier);
    this.pedalboard.effects.splice(effectIndex, 1);
    //this.service.delete(effect);
  }
}
