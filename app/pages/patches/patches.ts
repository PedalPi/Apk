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

  constructor(private nav : NavController, params : NavParams, private jsonService : JsonService) {
    this.bank = params.get('bank');
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

  itemSelected(patch) {
    this.nav.push(PatchPage, {'bank': this.bank, 'patch': patch});
  }

  onContextPatch(patch) {
    const contextMenu = new ContextMenu(patch.name, 'context');

    /*
    contextMenu.addItem('Reorder', () => {
      console.log('Beta 2.10 https://github.com/driftyco/ionic/issues/5595');
      console.log('http://codepen.io/leoz/pen/MwYxmj');
    });
    */

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
}
