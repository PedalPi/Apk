import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { IonicStorageModule } from '@ionic/storage'

import 'rxjs/add/operator/map';

// Pages
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { BanksPage } from '../pages/banks/banks';
import { ConfigurationsPage } from '../pages/configurations/configurations';
import { PedalboardDrawerPage } from '../pages/pedalboard-drawer/pedalboard-drawer';
import { PedalboardParametersPage } from '../pages/pedalboard-parameters/pedalboard-parameters';
import { PedalboardsPage } from '../pages/pedalboards/pedalboards';
import { PluginsCategoriesPage } from '../pages/plugins-categories/plugins-categories';
import { PluginsListPage } from '../pages/plugins-list/plugins-list';
import { PedalboardManagerPage } from '../pages/pedalboard-manager/pedalboard-manager';


// Components
import { SrButtonToggleComponent } from '../components/sr-button-toggle/sr-button-toggle';
import { SrCombobox } from '../components/sr-combobox/sr-combobox';
import { SrFootswitch } from '../components/sr-footswitch/sr-footswitch';
import { SrIcon } from '../components/sr-icon/sr-icon';
import { SrKnob } from '../components/sr-knob/sr-knob';
import { SrParamKnob } from '../components/sr-param-knob/sr-param-knob';
import { SrSlider } from '../components/sr-slider/sr-slider';
import { SrPedalboard } from '../components/sr-pedalboard/sr-pedalboard';
import { SrSetCurrent } from '../components/sr-set-current/sr-set-current';
import { SrTab } from '../components/sr-tabs/sr-tab';
import { SrTabs } from '../components/sr-tabs/sr-tabs';
import { SrToggle } from '../components/sr-toggle/sr-toggle';

// Others
import { DataService } from '../providers/data/data-service';
import { JsonService } from '../providers/json/json-service';
import { WebSocketService } from '../providers/websocket/web-socket-service';

import { Navigator } from '../common/navigator';

// Translate
import {Http} from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,

    AboutPage,
    HomePage,
    BanksPage,
    ConfigurationsPage,
    PedalboardDrawerPage,
    PedalboardParametersPage,
    PedalboardsPage,
    PedalboardManagerPage,
    PluginsCategoriesPage,
    PluginsListPage,

    SrButtonToggleComponent,
    SrCombobox,
    SrFootswitch,
    SrIcon,
    SrKnob,
    SrParamKnob,
    SrSlider,
    SrPedalboard,
    SrSetCurrent,
    SrTab,
    SrTabs,
    SrToggle,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot(),

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

    AboutPage,
    HomePage,
    BanksPage,
    ConfigurationsPage,
    PedalboardDrawerPage,
    PedalboardParametersPage,
    PedalboardsPage,
    PedalboardManagerPage,
    PluginsCategoriesPage,
    PluginsListPage,

    SrButtonToggleComponent,
    SrCombobox,
    SrFootswitch,
    SrIcon,
    SrKnob,
    SrParamKnob,
    SrSlider,
    SrPedalboard,
    SrSetCurrent,
    SrTab,
    SrTabs,
    SrToggle,
  ],
  providers: [
    Storage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataService,
    JsonService,
    WebSocketService,
    Navigator
  ]
})
export class AppModule {}
