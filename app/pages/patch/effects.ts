import {Page, ViewController, Modal, NavController, NavParams, Alert, IONIC_DIRECTIVES} from 'ionic-angular';

import {EffectListPage} from '../effectList/effectList';

@Page({
  templateUrl: 'build/pages/patch/effects.html'
})
export class EffectsPage {
  public patch : Object;
  public mode : string = 'normal';

  constructor(private nav : NavController, params: NavParams, private controller: ViewController) {
    this.patch = params.get('patch');
  }

  close() {
    this.controller.dismiss();
  }

  newEffect() {
    const modal = Modal.create(EffectListPage, { patch: this.patch });
    modal.onDismiss(effect => {
      if (effect)
        this.patch["effects"].push(effect)

      console.log(effect);
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
    this.patch["effects"].splice(index, 1);
  }
}
