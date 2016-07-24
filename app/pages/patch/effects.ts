import {Component} from '@angular/core';
import {ViewController, Modal, NavController, NavParams, Alert, IONIC_DIRECTIVES} from 'ionic-angular';

import {EffectListPage} from '../effectList/effectList';

import {JsonService} from '../../service/jsonService';

@Component({
  templateUrl: 'build/pages/patch/effects.html'
})
export class EffectsPage {
  public bank : any;
  public patch : any;
  public mode : string;

  constructor(private nav : NavController, params: NavParams, private controller: ViewController, private jsonService : JsonService) {
    this.bank = params.get('bank');
    this.patch = params.get('patch');

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
    const modal = Modal.create(EffectListPage, { patch: this.patch });
    modal.onDismiss(effect => {
      if (effect) {
        this.service.saveNewEffect(this.bank, this.patch, effect.uri)
            .subscribe(data => this.patch["effects"].push(data["effect"]));
      }
    });

    this.nav.present(modal);
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
