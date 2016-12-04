let I;

class PedalboardsPage {

  _init() {
    I = require('../steps_file.js')();
  }

  pedalboardSelector(position) {
    return `.pedalboards ion-list button:nth-of-type(${position})`;
  }

  createPedalboard(pedalboardName) {
    I.click('#add-pedalboard');
    I.solvePrompt(pedalboardName);
  }

  renamePedalboard(position, newName) {
    I.clickLong(this.pedalboardSelector(position));
    I.clickContextMenuItem(2);
    I.solvePrompt(newName);
  }

  deletePedalboard(position) {
    I.clickLong(this.pedalboardSelector(position));
    I.clickContextMenuItem(1);
    I.see('R u sure?');
    I.solveAlert();
  }

  goToEffectsOfPedalboard(position) {
    I.click(this.pedalboardSelector(position));
  }
}


module.exports = new PedalboardsPage();
