import {Page, ViewController, Modal, NavController, NavParams, Alert, IONIC_DIRECTIVES} from 'ionic-angular';

import {EffectListPage} from '../effectList/effectList';

import {JsonService} from '../../service/jsonService';

@Page({
  templateUrl: 'build/pages/patch/effects.html'
})
export class EffectsPage {
  public bank : any;
  public patch : any;
  public mode : string = 'normal';

  constructor(private nav : NavController, params: NavParams, private controller: ViewController, private jsonService : JsonService) {
    this.bank = params.get('bank');
    this.patch = params.get('patch');
  }

  private get service() {
    return this.jsonService.effect;
  }

  close() {
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

  get removeMode() {
    return this.mode == 'remove';
  }

  toRemoveMode() {
    this.mode = 'remove';
  }

  toNormalMode() {
    this.mode = 'normal';
  }

  remove(index : number) {
    this.service.deleteEffect(this.bank, this.patch, this.patch.effects[index])
        .subscribe(() => this.patch["effects"].splice(index, 1))
  }
}
