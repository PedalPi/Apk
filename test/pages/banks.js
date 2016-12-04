let I;

class BanksPage {
  _init() {
    I = require('../steps_file.js')();
  }

  bankSelector(position) {
    return `.banks ion-list button:nth-of-type(${position})`;
  }
  
  createBank(bankName) {
    I.click('#add-bank');
    I.solvePrompt(bankName);
  }

  renameBank(position, newName) {
    //this.clickLong(`//*[contains(@class, 'banks')]//banks//ion-card:last-child[contains(., '${originalName}')]`);
    I.clickLong(this.bankSelector(position));
    I.clickContextMenuItem(2);
    I.solvePrompt(newName);
  }

  deleteBank(position) {
    I.clickLong(this.bankSelector(position));
    I.clickContextMenuItem(1);
    I.see('R u sure?');
    I.solveAlert();
  }

  goToPathesOfBank(position) {
    I.click(this.bankSelector(position));
  }
}

module.exports = new BanksPage();
