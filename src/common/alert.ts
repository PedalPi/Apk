import 'rxjs/add/operator/toPromise';

import {AlertController, Alert, AlertOptions} from 'ionic-angular';
import {TranslateService} from '@ngx-translate/core';


export class AlertBuilder {
  private json : AlertOptions;
  private controller : AlertController;
  private translateService : TranslateService;
  private callbackFunction : Function = () => {};
  private defaultValueText : string;

  constructor(controller : AlertController, translateService : TranslateService = null) {
    this.controller = controller;
    this.json = {
      'title' : '',
      buttons: [],
      inputs: []
    };
    this.translateService = translateService;
  }

  private translate(text, data : any = {}) : Promise<string> {
    if (this.translateService == null)
      return Promise.resolve(text);

    return this.translateService
        .get(text, data)
        .toPromise();
  }

  async title(title : string, data : any = {}) {
    this.json.title = await this.translate(title, data);
  }

  async subTitle(subTitle : string, data : any = {}) {
    this.json.subTitle = await this.translate(subTitle, data);
  }

  async message(message : string, data : any = {}) {
    this.json.message = await this.translate(message, data);
  }

  callback(callback : Function) {
    this.callbackFunction = callback;
  }

  defaultValue(defaultValue : string) {
    this.defaultValueText = defaultValue;
  }

  addButton(button : any) {
    this.json.buttons.push(button);
  }

  addInput(input) {
    this.json.inputs.push(input);
  }

  generateSaveAlert() : Alert {
    this.addButton('Cancel');
    this.addButton({
      text: 'Save',
      handler: data => this.callbackFunction(data)
    });
    this.addInput({
      name: 'name',
      placeholder: 'Name',
      value: this.defaultValueText
    });

    return this.controller.create(this.json);
  }

  generate() : Alert {
    this.addButton({
      text: 'Ok',
      handler: data => this.callbackFunction(data)
    });

    return this.controller.create(this.json);
  }

  generateConfirmation() : Alert {
    this.addButton('Cancel');
    this.addButton({
      text: 'Ok',
      handler: data => this.callbackFunction(data)
    });

    return this.controller.create(this.json);
  }
}
