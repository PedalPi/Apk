import {Alert} from 'ionic-angular';

export class AlertCommon {
  static generate(title : string, saveCallback : Function, value? : string) {
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
}
