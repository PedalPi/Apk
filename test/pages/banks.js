'use strict';

let I;

module.exports = {

  _init() {
    I = require('../steps_file.js')();
  },

  createBank(bankName) {
    I.click('#add-bank');
    I.solvePrompt(bankName);
  },

  renameBank(position, newName) {
    //this.clickLong(`//*[contains(@class, 'banks')]//banks//ion-card:last-child[contains(., '${originalName}')]`);
    I.clickLong(`.banks ion-card:nth-of-type(${position}) button`);
    I.clickContextMenuItem(2);
    I.solvePrompt(newName);
  },

  deleteBank(position) {
    I.clickLong(`.banks ion-card:nth-of-type(${position}) button`);
    I.clickContextMenuItem(1);
    I.see('R u sure?');
    I.solveAlert();
  },

  goToPathesOfBank(position) {
    I.click(`.banks ion-card:nth-of-type(${position}) button`);
  }
}
