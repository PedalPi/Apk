import {NavController, NavParams, ModalController} from 'ionic-angular';
import {Component} from '@angular/core';

import {JsonService} from '../../providers/json/json-service';
import {PluginsPresenter} from './plugins-presenter';
import {PluginsListModal} from '../plugins-list/plugins-list-modal';


@Component({
  templateUrl: 'plugins.html',
})
export class PluginsPage {
  private presenter : PluginsPresenter;

  constructor(private nav : NavController, private params : NavParams, jsonService : JsonService, private modal : ModalController) {
    this.presenter = new PluginsPresenter(jsonService);
  }

  ionViewDidLoad() {
    this.presenter.load();
  }

  get categories() {
    return this.presenter.categories;
  }

  categorySelected(category : string) {
    let plugins = this.presenter.pluginsByCategory[category];

    const modal = this.modal.create(PluginsListModal, {category: category, plugins: plugins})
    modal.present();
    modal.onDidDismiss(effect => {
        if (effect == undefined)
            return;
        this.nav.pop().then(status => {
      	  const callback = this.params.get('resolve');
          callback(effect);
    	})
    });
  }
}
