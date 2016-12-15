import {NavController, NavParams} from 'ionic-angular';
import {Component} from '@angular/core';

import {JsonService} from '../../providers/json/json-service';
import {PluginsPresenter} from './plugins-presenter';


@Component({
  templateUrl: 'plugins.html',
})
export class PluginsPage {
  private presenter : PluginsPresenter;

  constructor(private nav : NavController, params : NavParams, jsonService : JsonService) {
    this.presenter = new PluginsPresenter(jsonService);
  }

  ionViewDidLoad() {
    console.log('teste');
    this.presenter.load();
  }

  get categories() {
    return this.presenter.categories;
  }
}
