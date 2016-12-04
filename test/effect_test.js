'use strict';

Feature('Effect');

Before((I, banksPage, pedalboardsPage) => {
  I.goToBanks();
  I.wait(0.5);
  banksPage.goToPathesOfBank(1);
  I.wait(0.5);
  pedalboardsPage.goToEffectsOfPedalboard(2);
  I.wait(0.5);
});

/*
Scenario.only('Edit value', (I, banksPage, pedalboardsPage) => {
  pause();
});
*/
