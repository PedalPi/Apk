import {Component} from '@angular/core';
import {ViewController, ModalController, NavController, NavParams} from 'ionic-angular';

import {EffectsListModal} from '../effects-list/effects-list-modal';

import {JsonService} from '../../providers/json/json-service';

@Component({
  templateUrl: 'pedalboard-effects-modal.html'
})
export class PedalboardEffectsModal {
  public bank : any;
  public pedalboard : any;
  public mode : string;
  private jsonService : JsonService;

  constructor(
      private nav : NavController,
      private modal : ModalController,
      params: NavParams,
      private controller: ViewController
    ) {
    this.bank = params.get('bank');
    this.pedalboard = params.get('pedalboard');
    this.jsonService = params.get('jsonService');

    this.toReorderMode();
  }

  private get service() {
    return this.jsonService.effect;
  }

  private get pedalboardService() {
    return this.jsonService.pedalboard;
  }

  close(effectIndex? : number) {
    if (effectIndex !== undefined)
      this.controller.dismiss({'index' : effectIndex});
    else
      this.controller.dismiss();
  }

  newEffect() {
    const data = {
      jsonService : this.jsonService
    };

    const modal = this.modal.create(EffectsListModal, data);
    modal.onDidDismiss(effect => {
      if (effect) {
        this.service.saveNewEffect(this.bank, this.pedalboard, effect.uri)
            .subscribe(data => this.pedalboard["effects"].push(data["effect"]));
      }
    });

    modal.present();
  }

  get reorderMode() {
    return !this.removeMode;
  }

  get removeMode() {
    return this.mode == 'remove';
  }

  toRemoveMode() {
    this.mode = 'remove';
  }

  toReorderMode() {
    this.mode = 'reorder';
  }

  select(index : number) {
    if (this.reorderMode)
      this.close(index);
  }

  remove(index : number) {
    this.service.deleteEffect(this.bank, this.pedalboard, this.pedalboard.effects[index])
        .subscribe(() => this.pedalboard["effects"].splice(index, 1))
  }

  reorderItems(indexes) {
    if (indexes.to == -100)
      indexes.to = 0;

    let effect = this.pedalboard.effects[indexes.from];

    this.pedalboard.effects.splice(indexes.from, 1);
    this.pedalboard.effects.splice(indexes.to, 0, effect);

    this.pedalboardService.swapEffects(this.bank, this.pedalboard, indexes.from, indexes.to)
        .subscribe(() => {});
  }
}
