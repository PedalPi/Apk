import {ActionSheetController, ActionSheet} from 'ionic-angular';
import {TranslateService} from '@ngx-translate/core';

export class ContextMenu {
  private json : Object = {};
  private translate : TranslateService;

  constructor(title:string, translateService:TranslateService = null) {
    this.json['title'] = title;
    this.json['cssClass'] = 'context';
    this.json['buttons'] = [];

    this.translate = translateService;
  }

  public addItem(text, handler) {
    if (this.translate !== null)
      this.addItemTranslate(text, handler);
    else
      this.addItemImpl(text, handler)
  }

  private addItemTranslate(text, handler) {
    this.translate.get(text).subscribe(res => this.addItemImpl(res, handler));
  }

  private addItemImpl(text, handler) {
    const item = {text : text, handler : handler};

    this.json['buttons'].push(item);
  }

  public generate(controller : ActionSheetController) : ActionSheet {
    return controller.create(this.json);
  }
}
