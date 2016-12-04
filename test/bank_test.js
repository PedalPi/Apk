'use strict';

Feature('Bank');

Before((I, banksPage) => {
  I.goToBanks();
  I.wait(0.3);
});

Scenario('View banks', (I, banksPage) => {
  I.see('Banks');
});

Scenario('Create bank', (I, banksPage) => {
  let bankName = 'Bank created';

  banksPage.createBank(bankName);
  I.wait(0.3);
  I.see(bankName);
});

Scenario('Rename bank', (I, banksPage) => {
  let originalName = 'Bank created';
  let renamedName = 'Bank renamed';

  banksPage.renameBank(3, renamedName);
  I.wait(0.3);
  I.see(renamedName);
});

Scenario('Delete bank', (I, banksPage) => {
  let bankName = 'Bank renamed';

  I.see(bankName);
  I.wait(0.3);

  banksPage.deleteBank(3);
  I.wait(0.3);
  I.dontSee(bankName);
});
