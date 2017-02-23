import {AlertController, Alert, AlertOptions, AlertInputOptions} from 'ionic-angular';


export class AlertBuilder {
  private json : AlertOptions;
  private controller : AlertController;
  private callbackFunction : Function = () => {};
  private defaultValueText : string;

  constructor(controller : AlertController) {
    this.controller = controller;
    this.json = {
      'title' : '',
      buttons: [],
      inputs: []
    };
  }

  title(title : string) : AlertBuilder {
    this.json.title = title;
    return this;
  }

  subTitle(subTitle : string) : AlertBuilder {
    this.json.subTitle = subTitle;
    return this;
  }

  message(message : string) : AlertBuilder {
    this.json.message = message;
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

  addButton(button : any) {
    this.json.buttons.push(button);
  }

  addInput(input : AlertInputOptions) {
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
