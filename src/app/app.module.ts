import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import 'rxjs/add/operator/map';

// Pages
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { BanksPage } from '../pages/banks/banks';
import { ConfigurationsPage } from '../pages/configurations/configurations';
import { PedalboardDrawerPage } from '../pages/pedalboard-drawer/pedalboard-drawer';
import { PedalboardPage } from '../pages/pedalboard/pedalboard';
import { PedalboardsPage } from '../pages/pedalboards/pedalboards';
import { PluginsPage } from '../pages/plugins/plugins';
import { PedalboardManagerPage } from '../pages/pedalboard-manager/pedalboard-manager';

import { PluginsListModal } from '../pages/plugins-list/plugins-list-modal';

// Components
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


const pages = [
  AboutPage,
  HomePage,
  BanksPage,
  ConfigurationsPage,
  PedalboardDrawerPage,
  PedalboardPage,
  PedalboardsPage,
  PluginsPage,
  PedalboardManagerPage,

  PluginsListModal
];

const components = [
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
];

const services = [
  DataService,
  JsonService,
  WebSocketService,

  Navigator
];


@NgModule({
  declarations: [MyApp].concat(<any> pages).concat(<any> components),
  imports: [
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp].concat(<any> pages),
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ].concat(<any> services)
})
export class AppModule {}
