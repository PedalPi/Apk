import {Component, ViewChild} from '@angular/core';
import {ViewController, NavController, NavParams} from 'ionic-angular';

import {SrTabs} from '../../components/sr-tabs/sr-tabs';
import {SrTab} from '../../components/sr-tabs/sr-tab';

import {JsonService} from '../../service/json/json-service';

import {AlertCommon} from '../../common/alert';

@Component({
  templateUrl: 'build/pages/effects-list/effects-list-modal.html',
  directives: [SrTabs, SrTab]
})
export class EffectsListModal {
  @ViewChild(SrTabs) tabs: SrTabs;

  public items : any;
  public effects : any = [];
  public effectsByCategory : any = {};

  public categories = [];
  private jsonService : JsonService;

  constructor(private nav : NavController, params : NavParams, private controller: ViewController) {
    this.jsonService = params.get('jsonService');
  }

  private get service() {
      return this.jsonService.plugin;
  }

  ngOnInit() {
    //https://github.com/mozilla/localForage
    this.service.getPlugins().subscribe(
      data => {
        this.effects = data.plugins.sort((a, b) => a.name.localeCompare(b.name));
        this.items = this.effects;

        this.effectsByCategory = this.separatePluginsByCategory(this.effects);

        this.categories = Object.keys(this.effectsByCategory).sort(
          (a, b) => a.localeCompare(b)
        );
      }
    );
  }

  private separatePluginsByCategory(plugins : any[]) : any {
    let effectsByCategory = {};

    for (let plugin of plugins) {
      for (let category of plugin.category) {
        if (effectsByCategory[category] === undefined)
          effectsByCategory[category] = []

        effectsByCategory[category].push(plugin);
      }
    }

    return effectsByCategory;
  }

  close() {
    this.controller.dismiss();
  }

  getItems(event) {
    let q = event.target.value;

    if (q.trim() == '') {
      this.items = this.effects;
      return;
    }

    this.items = this.effects.filter(v => v.name.toLowerCase().indexOf(q.toLowerCase()) > -1)
  }

  itemSelected(effect) {
    for (let parameter of effect.ports.control.input) {
      parameter["current"] = parameter["default"];
      delete parameter["default"];
    }

    this.controller.dismiss(effect);
  }

  categorySelected(category) {
    const index = this.categories.indexOf(category);
    this.tabs.selectTab(index+2);
    this.tabs.focusTab(index+2);
  }
}
