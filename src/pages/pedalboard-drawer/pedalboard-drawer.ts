import {
  Component, ViewChild,
  Input, Output, EventEmitter
} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {JsonService} from '../../providers/json/json-service';
import {DataService} from '../../providers/data/data-service';

import {SrPedalboard} from '../../components/sr-pedalboard/sr-pedalboard';

import {SrPedalboardFacade} from './sr-pedalboard-facade';
import {PluginsPage} from '../plugins/plugins';

import {Effect} from '../../plugins-manager/model/effect';
import {Pedalboard} from '../../plugins-manager/model/pedalboard';
import {Navigator} from '../../common/navigator';


@Component({
  selector: 'page-pedalboard-drawer',
  templateUrl: 'pedalboard-drawer.html',
})
export class PedalboardDrawerPage {
  @ViewChild(SrPedalboard) pedalboardElement : SrPedalboard;

  @Input() pedalboard : Pedalboard;
  @Output() onEffectClick = new EventEmitter();
  @Output() onEffectDoubleClick = new EventEmitter();

  constructor(
      private nav : NavController,
      private params : NavParams,
      data : DataService,
      private jsonService : JsonService,
      private navigator : Navigator
  ) {}

  private get service() {
    return this.jsonService.pedalboard;
  }

  private get effectService() {
    return this.jsonService.effect;
  }

  ionViewDidLoad() {
    this.drawPedalboard(this.pedalboard, false);
  }

  public drawPedalboard(pedalboard, clear) {
    if (clear)
      this.pedalboardElement.clear()

    new SrPedalboardFacade(this.pedalboardElement, pedalboard).load()

    this.pedalboardElement.onEffectMoved = effect => {
      this.onEffectClick.emit(effect.identifier);
      this.savePedalboardData();
    }
    this.pedalboardElement.onEffectDoubleClick = effect => this.onEffectDoubleClick.emit(effect.identifier);

    this.pedalboardElement.onConnectionAdded = connection => this.addConnection(connection);
    this.pedalboardElement.onConnectionRemoved = connection => this.removeConnection(connection);
    this.pedalboardElement.onEffectRemoved = effect => this.removeEffect(effect);
  }

  public select(effect : Effect) {
    this.pedalboardElement.select(effect);
  }

  removeSeleted() {
    this.pedalboardElement.removeSeleted();
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
