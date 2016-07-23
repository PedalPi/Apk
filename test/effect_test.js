'use strict';

Feature('Effect');

Before((I, banksPage, patchesPage) => {
  I.goToBanks();
  I.wait(0.5);
  banksPage.goToPathesOfBank(1);
  I.wait(0.5);
  patchesPage.goToEffectsOfPatch(2);
  I.wait(0.5);
});

Scenario.only('Edit value', (I, banksPage, patchesPage) => {
  pause();
});
