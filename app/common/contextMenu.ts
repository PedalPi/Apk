import {ActionSheet} from 'ionic-angular';

export class ContextMenu {
  private json : Object = {};

  constructor(title, cssClass) {
    this.json['title'] = title;
    this.json['cssClass'] = cssClass;
    this.json['buttons'] = [];
  }

  public addItem(text, handler) {
    const item = {text : text, handler : handler};

    this.json['buttons'].push(item);
  }

  public generate() : ActionSheet {
    return ActionSheet.create(this.json);
  }
}
