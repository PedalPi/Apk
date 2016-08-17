import {Component} from '@angular/core';
import {ViewController, ModalController, NavController, NavParams, Alert, IONIC_DIRECTIVES} from 'ionic-angular';

import {EffectsListModal} from '../effects-list/effects-list-modal';

import {JsonService} from '../../service/json-service';

@Component({
  templateUrl: 'build/pages/patch-effects/patch-effects-modal.html'
})
export class PatchEffectsModal {
  public bank : any;
  public patch : any;
  public mode : string;
  private jsonService : JsonService;

  constructor(
      private nav : NavController,
      private modal : ModalController,
      params: NavParams,
      private controller: ViewController
    ) {
    this.bank = params.get('bank');
    this.patch = params.get('patch');
    this.jsonService = params.get('jsonService');

    this.toReorderMode();
  }

  private get service() {
    return this.jsonService.effect;
  }

  private get patchService() {
    return this.jsonService.patch;
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
        this.service.saveNewEffect(this.bank, this.patch, effect.uri)
            .subscribe(data => this.patch["effects"].push(data["effect"]));
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
    this.service.deleteEffect(this.bank, this.patch, this.patch.effects[index])
        .subscribe(() => this.patch["effects"].splice(index, 1))
  }

  reorderItems(indexes) {
    if (indexes.to == -100)
      indexes.to = 0;

    let effect = this.patch.effects[indexes.from];

    this.patch.effects.splice(indexes.from, 1);
    this.patch.effects.splice(indexes.to, 0, effect);

    this.patchService.swapEffects(this.bank, this.patch, indexes.from, indexes.to)
        .subscribe(() => {});
  }
}
