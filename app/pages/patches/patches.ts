import {Component} from '@angular/core';
import {NavController, NavParams, AlertController, ActionSheetController} from 'ionic-angular';
import {PatchPage} from '../patch/patch';

import {JsonService} from '../../service/json/json-service';

import {AlertBuilder} from '../../common/alert';
import {ContextMenu} from '../../common/contextMenu';
import {SrIcon} from '../../components/sr-icon/sr-icon';

import {PatchGenerator} from '../../generator/modelGenerator';
import {PatchesPresenter} from './patches-presenter';

@Component({
  templateUrl: 'build/pages/patches/patches.html',
  directives: [SrIcon]
})
export class PatchesPage {
  public bank : any;
  public reordering : boolean;

  private presenter : PatchesPresenter;

  constructor(
      private nav : NavController,
      params : NavParams,
      private alert : AlertController,
      private actionSheet : ActionSheetController,
      private jsonService : JsonService
    ) {
    this.presenter = new PatchesPresenter(this, params.get('bank'), jsonService);
    this.bank = params.get('bank');
    this.reordering = false;
  }

  createPatch() {
    let alert = new AlertBuilder(this.alert)
      .title('New patch')
      .callback((data) => this.presenter.requestSavePatch(data))
      .generateSaveAlert();

    alert.present();
  }

  itemSelected(patch) {
    this.nav.push(PatchPage, {'bank': this.bank, 'patch': patch});
  }

  onContextPatch(patch) {
    if (this.reordering)
      return;

    const contextMenu = new ContextMenu(patch.name, 'context');
    let contextInstance = null;

    contextMenu.addItem('Reorder', () => this.reordering = !this.reordering);

    contextMenu.addItem('Remove', () => {
      let alert = new AlertBuilder(this.alert)
        .title(`Delete ${patch.name}`)
        .message(`R u sure?`)
        .callback(data => this.presenter.requestDeletePatch(patch))
        .generationConfirmAlert();

      contextInstance.onDidDismiss(() => alert.present());
    });

    contextMenu.addItem('Rename', () => {
      let alert = new AlertBuilder(this.alert)
        .title('Rename patch')
        .defaultValue(patch.name)
        .callback(data => this.presenter.requestRenamePatch(patch, data))
        .generateSaveAlert();

      contextInstance.onDidDismiss(() => alert.present());
    });

    //contextMenu.addItem('Copy to local', () => console.log('Cancel clicked'));

    contextInstance = contextMenu.generate(this.actionSheet);
    contextInstance.present();
  }

  reorderItems(indexes) {
    if (indexes.to == -100)
      indexes.to = 0;

    this.presenter.reorderItems(indexes.from, indexes.to);
  }

  disableReorder() {
    this.reordering = false;
  }
}
