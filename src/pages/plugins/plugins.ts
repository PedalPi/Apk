import {NavController, NavParams, ModalController} from 'ionic-angular';
import {Component} from '@angular/core';

import {JsonService} from '../../providers/json/json-service';
import {DataService} from '../../providers/data/data-service';
import {PluginsPresenter} from './plugins-presenter';
import {PluginsListModal} from '../plugins-list/plugins-list-modal';

import {LoadingController} from 'ionic-angular';


@Component({
  templateUrl: 'plugins.html',
})
export class PluginsPage {
  private presenter : PluginsPresenter;

  constructor(
      private nav : NavController,
      private params : NavParams,
      jsonService : JsonService,
      dataService : DataService,
      private modal : ModalController,
      private loadingCtrl : LoadingController) {
    this.presenter = new PluginsPresenter(jsonService, dataService);
  }

  ionViewDidLoad() {
    this.refresh();
  }

  get categories() {
    return this.presenter.categories;
  }

  refresh() {
    const loading = this.loadingCtrl.create({content: "Getting plugins"});
    loading.present();
    this.presenter.load(() => loading.dismiss());
  }

  categorySelected(category : string) {
    let plugins = this.presenter.pluginsByCategory[category];
    this.goToPluginsList(category, plugins);
  }

  categoryAllSelected() {
    this.goToPluginsList('All', this.presenter.plugins);
  }

  private goToPluginsList(category : string, plugins : any) {
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
