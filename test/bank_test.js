
Feature('Bank');

Scenario('View banks', (I) => {
  I.amOnPage('/');
  I.see('PedalPi - Home');
  I.click('#pedalpi');
  I.see('Banks');
});

Scenario('Create bank', (I) => {
  I.amOnPage('/');
  I.click('#pedalpi');
  I.see('Banks');
  I.wait(0.3);
  I.click('#add-bank');
  I.waitForElement('ion-alert', 5);
  I.see('New bank');
  I.appendField('[type=text]', 'Bank created');

  //I.click('Save');
  I.wait(0.5);
  I.clickIonAlertButton(2);

  I.see('Bank created');
});

Scenario('Rename bank', (I) => {});
Scenario('Delete bank', (I) => {});
