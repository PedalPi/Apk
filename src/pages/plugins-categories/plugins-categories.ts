import {Input, Component, ElementRef} from '@angular/core';
import {LoadingController, AlertController} from 'ionic-angular';

import {TranslateService} from '@ngx-translate/core';

import {Fragment} from '../../common/fragment/fragment';
import {FragmentNavigator} from '../../common/fragment/fragment-navigator';

import {JsonService} from '../../providers/json/json-service';
import {DataService} from '../../providers/data/data-service';
import {PluginsCategoriesPresenter} from './plugins-categories-presenter';
import {PluginsListPage} from '../plugins-list/plugins-list';

import {AlertBuilder} from '../../common/alert';

@Component({
  selector: 'page-plugins-categories',
  templateUrl: 'plugins-categories.html',
})
export class PluginsCategoriesPage implements Fragment {
  @Input() fragmentNavigator : FragmentNavigator;
  private presenter : PluginsCategoriesPresenter;

  constructor(
      private element : ElementRef,
      jsonService : JsonService,
      dataService : DataService,
      private loadingCtrl : LoadingController,
      public alert : AlertController,
      private translate: TranslateService) {
    this.presenter = new PluginsCategoriesPresenter(jsonService, dataService);
  }

  get categories() {
    return this.presenter.categories;
  }

  get alertBuilder() {
    return new AlertBuilder(this.alert, this.translate);
  }

  async refresh() {
    const loading = this.loadingCtrl.create({content: "Getting plugins"});
    loading.present();
    try {
      await this.presenter.refreshPlugins();
    } catch (e) {
      let builder = this.alertBuilder;
      builder.title('ERROR')
      builder.message(e.json()['error']);
      builder.generate()
             .present();
    }

    loading.dismiss()
  }

  categorySelected(category : string) {
    let plugins = this.presenter.pluginsByCategory[category];
    this.goToPluginsList(category, plugins);
  }

  categoryAllSelected() {
    this.goToPluginsList('All', this.presenter.plugins);
  }

  private goToPluginsList(category : string, plugins : any) {
    const parameters = {
      category: category,
      plugins: plugins
    };

    this.fragmentNavigator
        .push(PluginsListPage, parameters);
  }

  public close() {
    this.fragmentNavigator.pop();
  }

  public getNativeElement() {
    return this.element.nativeElement;
  }
}
