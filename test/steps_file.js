'use strict';
// in this file you can append custom step methods to 'I' object


module.exports = function() {
  return actor({
    // Define custom steps here, use 'this' to access default methods of I.
    // It is recommended to place a general 'login' function here.
    clickIonAlertButton(index) {
      this.click(`ion-alert button:nth-of-type(${index})`);
    },

    clickContextMenuItem(index) {
      this.click(`ion-action-sheet button:nth-of-type(${index})`);
    },

    clickLong(element) {
      var textFunction = `
        let mouseEventExecutor = function(target, eventName) {
          let event = document.createEvent("MouseEvents");
          event.initEvent.apply(event, [eventName, true, true]);
          target.dispatchEvent(event);
        };

        element = document.querySelector("${element}");
        mouseEventExecutor(element, 'mousedown');
      `;

      this.executeScript(textFunction);
      this.wait(1);
    },

    goToBanks() {
      this.amOnPage('/');
      this.click('#pedalpi');
    },

    solvePrompt(text) {
      this.waitForElement('ion-alert', 2);
      this.clearField('[type=text]');
      this.appendField('[type=text]', text);
      this.solveAlert();
    },

    solveAlert(text) {
      this.waitForElement('ion-alert', 2);
      this.wait(0.8);
      this.clickIonAlertButton(2);
    },
  });
}
