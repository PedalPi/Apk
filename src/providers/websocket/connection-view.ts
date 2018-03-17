import {ToastController, LoadingController, ModalController} from 'ionic-angular';
import {TranslateService} from '@ngx-translate/core';

import {ConnectionStatus, WebSocketService} from './web-socket-service';
import {ConnectionPage} from '../../pages/connection/connection';
import {DataService} from '../data/data-service';

import {JsonService} from '../json/json-service';

import {BanksManager} from '../../plugins-manager/banks-manager'


export class ConnectionView {
  private showModal : boolean;
  public onDataLoaded = () => {};

  private modal;

  constructor(
      private loadingCtrl : LoadingController,
      private toastCtrl : ToastController,
      private modalCtrl: ModalController,
      private data : DataService,
      private json: JsonService,
      private translate: TranslateService,
      private ws: WebSocketService) {
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
    this.modal = this.modalCtrl.create(ConnectionPage, {}, {enableBackdropDismiss: false});

    this.modal.onDidDismiss(() => this.showModal = false);
    this.modal.present();
  }

  public dismiss() {
    if (this.modal !== undefined)
      this.modal.dismiss();
  }

  private async getData() {
    const loading = this.loadingCtrl.create({content: "Getting data"});
    loading.present();

    let response = await this.json.auth.auth("pedal pi", "pedal pi").toPromise();
    JsonService.token = response["token"];

    this.ws.registerOnServer(JsonService.token)

    let pluginsData = await this.json.plugin.getPlugins().toPromise();
    const plugins = pluginsData.plugins;
    this.data.updatePlugins(plugins);

    let banksData = await this.json.banks.getBanks().toPromise();
    this.data.remote.manager = BanksManager.generate(banksData, plugins);

    let configurations = await this.json.configurations.getDeviceName().toPromise();
    this.data.remote.configurations = {
      'device': {
        'name': configurations.name
      }
    };

    loading.dismiss();

    this.onDataLoaded();
  }
}
