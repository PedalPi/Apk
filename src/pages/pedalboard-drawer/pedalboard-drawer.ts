import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {JsonService} from '../../providers/json/json-service';
import {DataService} from '../../providers/data/data-service';
import {WebSocketService} from '../../providers/websocket/web-socket-service';
import {UpdateType} from '../../providers/websocket/pedalpi-message-decoder';

import {SrPedalboard} from '../../components/sr-pedalboard/sr-pedalboard';

import {SrPedalboardFacade} from './sr-pedalboard-facade';
import {PluginsPage} from '../plugins/plugins';

import {Effect} from '../../plugins-manager/model/effect';
import {Navigator} from '../../common/navigator';


@Component({
  selector: 'page-pedalboard-drawer',
  templateUrl: 'pedalboard-drawer.html',
})
export class PedalboardDrawerPage {
  @ViewChild(SrPedalboard) pedalboardElement : SrPedalboard;
  private pedalboard : any;

  constructor(
      private nav : NavController,
      private params : NavParams,
      data : DataService,
      private jsonService : JsonService,
      private ws : WebSocketService,
      private navigator : Navigator
  ) {
    this.pedalboard = params.get('pedalboard');
  }

  private get service() {
    return this.jsonService.pedalboard;
  }

  private get effectService() {
    return this.jsonService.effect;
  }

  ngAfterViewInit() {
    console.log('ngAfterContentInit')
    this.ionViewDidLoad();
  }

  ionViewWillEnter() {
    this.ws.clearListeners();

    this.ws.messageDecoder.onNotificationCurrentPedalboard = pedalboard => console.log('Mudaram o pedalboard, marróia');
    this.ws.messageDecoder.onNotificationEffect = (updateType, effect) => this.drawPedalboard(this.pedalboard, true);
    this.ws.messageDecoder.onNotificationConnection = (updateType, effect) => this.drawPedalboard(this.pedalboard, true);

    this.ws.messageDecoder.onNotificationPedalboard = (updateType, pedalboard) => {
      const hasBeenRemoved = this.pedalboard.index == -1;
      const hasBeenUpdated = this.pedalboard.index == pedalboard.index;

      if (updateType == UpdateType.UPDATED && (hasBeenRemoved || hasBeenUpdated)) {
        this.pedalboard = pedalboard;
        this.drawPedalboard(this.pedalboard, true);

      } else if (updateType == UpdateType.REMOVED && hasBeenRemoved) {
        this.nav.pop();
        alert("This pedalboard has been deleted!");
      }
    }
  }

  ionViewWillLeave() {
    this.ws.clearListeners();
  }

  ionViewDidLoad() {
    this.drawPedalboard(this.pedalboard, false);
  }

  private drawPedalboard(pedalboard, clear) {
    console.log(pedalboard);
    if (clear)
      this.pedalboardElement.clear()

    new SrPedalboardFacade(this.pedalboardElement, pedalboard).load()

    this.pedalboardElement.onEffectMoved = effect => this.savePedalboardData();
    this.pedalboardElement.onEffectDoubleClick = effect => this.goToEffects(effect);

    this.pedalboardElement.onConnectionAdded = connection => this.addConnection(connection);
    this.pedalboardElement.onConnectionRemoved = connection => this.removeConnection(connection);
    this.pedalboardElement.onEffectRemoved = effect => this.removeEffect(effect);
  }

  removeSeleted() {
    this.pedalboardElement.removeSeleted();
  }

  goToEffects(effect?) {
    let promise = this.nav.pop({animate: false})

    if (effect)
      promise.then(status => this.navigator.callBackSucess(this.params, {effect: effect.identifier}));
  }

  addEffect() {
    this.navigator.push(PluginsPage, {})
        .thenBackSucess(params => this.onBackSucess(params.effect))
  }

  onBackSucess(effect : Effect) {
    effect.pedalboard = this.pedalboard;
    this.pedalboard.effects.push(effect);

    this.effectService.saveNew(effect).subscribe(
      () => this.drawPedalboard(this.pedalboard, true)
    );

    return true;
  }

  private savePedalboardData() {
    const data = { effectPositions: this.pedalboardElement.effectPositions }
    this.pedalboard.data = {'pedalpi-apk': data};

    this.service.updateData(this.pedalboard, data).subscribe();
  }

  private removeEffect(effect) {
    const effectIndex = this.pedalboard.effects.indexOf(effect.identifier);

    this.effectService.delete(effect.identifier).subscribe(
      () => this.pedalboard.effects.splice(effectIndex, 1)
    );
  }

  private addConnection(connection) {
    const newConnection = connection.model;
    this.pedalboard.connections.push(newConnection);

    this.service.connect(this.pedalboard, newConnection).subscribe();
  }

  private removeConnection(connection) {
    const newConnection = connection.model;

    const connectionIndex = this.pedalboard.connections.indexOf(connection.identifier);
    this.pedalboard.connections.splice(connectionIndex, 1);

    this.service.disconnect(this.pedalboard, newConnection).subscribe();
  }
}
