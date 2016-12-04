'use strict';

Feature('Pedalboard');

Before((I, banksPage) => {
  I.goToBanks();
  I.wait(0.5);
  banksPage.goToPathesOfBank(1);
  I.wait(0.5);
});

/*
Scenario('View pedalboards', (I) => {
  I.see('?');
});
*/

Scenario('Create pedalboard', (I, pedalboardsPage) => {
  let pedalboardName = 'Pedalboard created';

  pedalboardsPage.createPedalboard(pedalboardName);
  I.see(pedalboardName);
});

Scenario('Rename pedalboard', (I, pedalboardsPage) => {
  let pedalboardRenamedName = 'Pedalboard renamed';

  pedalboardsPage.renamePedalboard(3, pedalboardRenamedName);
  I.see(pedalboardRenamedName);
});

Scenario('Delete bank', (I, pedalboardsPage) => {
  let pedalboardName = 'Pedalboard renamed';

  I.see(pedalboardName);
  I.wait(0.3);

  pedalboardsPage.deletePedalboard(3);
  I.dontSee(pedalboardName);
});
