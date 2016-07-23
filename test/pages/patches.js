'use strict';

let I;

module.exports = {

  _init() {
    I = require('../steps_file.js')();
  },

  patch(position) {
    return `.patches ion-card:nth-of-type(${position}) button`;
  },

  createPatch(patchName) {
    I.click('#add-patch');
    I.solvePrompt(patchName);
  },

  renamePatch(position, newName) {
    I.clickLong(this.patch(position));
    I.clickContextMenuItem(2);
    I.solvePrompt(newName);
  },

  deletePatch(position) {
    I.clickLong(this.patch(position));
    I.clickContextMenuItem(1);
    I.see('R u sure?');
    I.solveAlert();
  },

  goToEffectsOfPatch(position) {
    I.click(this.patch(position));
  }
}
