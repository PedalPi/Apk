import {ToastController, LoadingController, ModalController} from 'ionic-angular';
import {TranslateService} from '@ngx-translate/core';

import {ConnectionStatus} from './web-socket-service';
import {ConnectionPage} from '../../pages/connection/connection';
import {DataService} from '../data/data-service';

import {JsonService} from '../json/json-service';
import {PluginService} from '../json/plugin-service';
import {BanksService} from '../json/banks-service';

import {BanksManager} from '../../plugins-manager/banks-manager'


export class ConnectionView {
  private showModal : boolean;
  public onDataLoaded = () => {};

  constructor(
      private loadingCtrl : LoadingController,
      private toastCtrl : ToastController,
      private modalCtrl: ModalController,
      private data : DataService,
      private jsonService: JsonService,
      private translate: TranslateService) {
    this.loadingCtrl = loadingCtrl;
    this.toastCtrl = toastCtrl;

    this.showModal = false;
  }

  public async onStatusChanged(status : ConnectionStatus) {
    if (status == ConnectionStatus.CONNECTED) {
      this.showToast('DEVICE_CONNECTED');
      this.getData();

    } else if (status == ConnectionStatus.TRYING_RECONNECT)
      this.showToast('TRYING_CONNECT');

    else if (status == ConnectionStatus.DISCONNECTED) {
      this.showToast('CONNECTION_ERROR');

      if (!this.showModal)
        this.showConnectionModal();
    }
  }

  private async showToast(message, duration=3000) {
    message = await this.translate.get(message).toPromise();

    this.toastCtrl.create({
      message: message,
      duration: duration
    }).present();
  }

  public showConnectionModal() {
    this.showModal = true;
    let modal = this.modalCtrl.create(ConnectionPage, {}, {enableBackdropDismiss: false});

    modal.onDidDismiss(() => this.showModal = false);
    modal.present();
  }



  private async getData() {
    const loading = this.loadingCtrl.create({content: "Getting data"});
    loading.present();

    let pluginsData = await this.pluginService.getPlugins().toPromise();
    const plugins = pluginsData.plugins;
    this.data.updatePlugins(plugins);

    let banksData = await this.banksService.getBanks().toPromise();
    this.data.remote.manager = BanksManager.generate(banksData, plugins);

    loading.dismiss();

    this.onDataLoaded();
  }

  private get banksService() : BanksService {
    return this.jsonService.banks;
  }

  private get pluginService() : PluginService {
    return this.jsonService.plugin;
  }
}
