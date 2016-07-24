import {Component} from '@angular/core';
import {NavController, NavParams, Alert} from 'ionic-angular';
import {PatchPage} from '../patch/patch';

import {JsonService} from '../../service/jsonService';

import {AlertCommon} from '../../common/alert';
import {ContextMenu} from '../../common/contextMenu';
import {SrIcon} from '../../components/sr-icon/sr-icon';

import {PatchGenerator} from '../../generator/modelGenerator';

@Component({
  templateUrl: 'build/pages/patches/patches.html',
  directives: [SrIcon]
})
export class PatchesPage {
  public bank : any;
  public reordering : boolean;

  constructor(private nav : NavController, params : NavParams, private jsonService : JsonService) {
    this.bank = params.get('bank');
    this.reordering = false;
  }

  createPatch() {
    let alert = AlertCommon.generate('New patch', data => {
      const patch = PatchGenerator.generate(data.name);
      const savePatch = status => this.bank.patches.push(patch);

      this.service.saveNewPatch(this.bank, patch).subscribe(savePatch);
    });
    this.nav.present(alert);
  }

  private get service() {
    return this.jsonService.patch;
  }

  private get banksService() {
    return this.jsonService.banks;
  }

  itemSelected(patch) {
    this.nav.push(PatchPage, {'bank': this.bank, 'patch': patch});
  }

  onContextPatch(patch) {
    const contextMenu = new ContextMenu(patch.name, 'context');

    contextMenu.addItem('Reorder', () => this.reordering = !this.reordering);

    contextMenu.addItem('Remove', () => {
      const deletePatch = () => {
        const patchIndex = this.bank.patches.indexOf(patch);
        this.bank.patches.splice(patchIndex, 1);
      };
      const requestDeletePatch = () => this.service.deletePatch(this.bank, patch).subscribe(deletePatch);

      const alert = AlertCommon.alert('R u sure?', requestDeletePatch);

      this.nav.present(alert);
    });

    contextMenu.addItem('Rename', () => {
      const requestRenamePatch = data => {
          patch.name = data.name;
          this.service.updatePatch(this.bank, patch).subscribe(() => {});
      };

      let alert = AlertCommon.generate('Rename patch', requestRenamePatch, patch.name);

      this.nav.present(alert);
    });

    //contextMenu.addItem('Copy to local', () => console.log('Cancel clicked'));

    this.nav.present(contextMenu.generate());
  }

  reorderItems(indexes) {
    if (indexes.to == -100)
      indexes.to = 0;

    let patch = this.bank.patches[indexes.from];

    this.bank.patches.splice(indexes.from, 1);
    this.bank.patches.splice(indexes.to, 0, patch);

    this.banksService.swapPatches(this.bank, indexes.from, indexes.to)
        .subscribe(() => {});
  }

  disableReorder() {
    this.reordering = false;
  }
}
