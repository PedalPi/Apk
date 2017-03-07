import { Input, Component, ElementRef} from '@angular/core';
import {LoadingController, NavController, NavParams, ModalController} from 'ionic-angular';

import {Navigator} from '../../common/navigator';
import {Fragment} from '../../common/fragment/fragment';
import {FragmentNavigator} from '../../common/fragment/fragment-navigator';

import {JsonService} from '../../providers/json/json-service';
import {DataService} from '../../providers/data/data-service';
import {PluginsPresenter} from './plugins-presenter';
import {PluginsListModal} from '../plugins-list/plugins-list-modal';


@Component({
  selector: 'page-plugins',
  templateUrl: 'plugins.html',
})
export class PluginsPage implements Fragment {
  @Input() fragmentNavigator : FragmentNavigator;
  private presenter : PluginsPresenter;

  constructor(
      private element : ElementRef,
      private nav : NavController,
      private params : NavParams,
      jsonService : JsonService,
      dataService : DataService,
      private modal : ModalController,
      private loadingCtrl : LoadingController,
      private navigator : Navigator) {
    this.presenter = new PluginsPresenter(jsonService, dataService);
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
    console.log(this.presenter)
    this.goToPluginsList('All', this.presenter.plugins);
  }

  private goToPluginsList(category : string, plugins : any) {
    const modal = this.modal.create(PluginsListModal, {category: category, plugins: plugins})
    modal.present();
    modal.onDidDismiss(effect => {
      if (effect == undefined)
        return;

      this.nav.pop().then(status => this.navigator.callBackSucess(this.params, {effect: effect}));
    });
  }

  public close() {
    this.fragmentNavigator.pop();
  }

  public getNativeElement() {
    return this.element.nativeElement;
  }
}
