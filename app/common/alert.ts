import {Alert} from 'ionic-angular';

export class AlertCommon {
  static generate(title : string, saveCallback : Function, value? : string) : Alert {
    return Alert.create({
      'title': title,
      buttons: ['Cancel', {
        text: 'Save',
        handler: data => saveCallback(data)
      }],
      inputs: [{
        name: 'name',
        placeholder: 'Name',
        value: value
      }]
    });
  }

  static alert(title : string, okCallback : Function) : Alert {
    return Alert.create({
      'title': title,
      buttons: ['Cancel', {
        text: 'Ok',
        handler: data => okCallback(data)
      }]
    });
  }
}
