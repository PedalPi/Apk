import {Alert} from 'ionic-angular';
import {AlertController} from 'ionic-angular';

export class AlertCommon {
  static generate(title : string, callback : Function, value? : any) : Alert {
    return null;
  }

  static alert(title : string, okCallback : Function) : Alert {
    /*return Alert.create({
      'title': title,
      buttons: ['Cancel', {
        text: 'Ok',
        handler: data => okCallback(data)
      }]
    });*/
    return null;
  }
}

export class AlertBuilder {
  private controller : AlertController;
  private titleText : string = '';
  private callbackFunction : Function;
  private defaultValueText : string;

  constructor(controller : AlertController) {
    this.controller = controller;
  }

  title(title : string) : AlertBuilder {
    this.titleText = title;
    return this;
  }

  callback(callback : Function) : AlertBuilder {
    this.callbackFunction = callback;
    return this;
  }

  defaultValue(defaultValue : string) : AlertBuilder {
    this.defaultValueText = defaultValue;
    return this;
  }

  generateSaveAlert() : Alert {
    return this.controller.create({
      'title': this.titleText,
      buttons: [
        'Cancel',
        {
          text: 'Save',
          handler: data => this.callbackFunction(data)
        }
      ],
      inputs: [{
        name: 'name',
        placeholder: 'Name',
        value: this.defaultValueText
      }]
    });
  }

  generationConfirmAlert() : Alert {
    return this.controller.create({
      'title': this.titleText,
      buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: data => this.callbackFunction(data)
      }]
    });
  }
}
