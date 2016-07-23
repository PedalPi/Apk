'use strict';

Feature('Patch');

Before((I, banksPage) => {
  I.goToBanks();
  I.wait(0.5);
  banksPage.goToPathesOfBank(1);
  I.wait(0.5);
});

/*
Scenario('View patches', (I) => {
  I.see('?');
});
*/

Scenario('Create patch', (I, patchesPage) => {
  let patchName = 'Patch created';

  patchesPage.createPatch(patchName);
  I.see(patchName);
});

Scenario('Rename patch', (I, patchesPage) => {
  let patchRenamedName = 'Patch renamed';

  patchesPage.renamePatch(3, patchRenamedName);
  I.see(patchRenamedName);
});

Scenario('Delete bank', (I, patchesPage) => {
  let patchName = 'Patch renamed';

  I.see(patchName);
  I.wait(0.3);

  patchesPage.deletePatch(3);
  I.dontSee(patchName);
});
