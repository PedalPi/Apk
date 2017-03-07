import {
  Input, Output, EventEmitter,
  Component, ViewChild, ApplicationRef,
  ElementRef
} from '@angular/core';
import {NavParams} from 'ionic-angular';

import {JsonService} from '../../providers/json/json-service';

import {Fragment} from '../../common/fragment/fragment';

import {SrTabs} from '../../components/sr-tabs/sr-tabs';
import {SrSetCurrent} from '../../components/sr-set-current/sr-set-current';

import {PedalboardPresenter} from './pedalboard-presenter';

import {Effect} from '../../plugins-manager/model/effect';
import {Pedalboard} from '../../plugins-manager/model/pedalboard';

import {Lv2Param} from '../../plugins-manager/model/lv2/lv2-param';


@Component({
  selector: 'page-pedalboard',
  templateUrl: 'pedalboard.html',
})
export class PedalboardPage implements Fragment {
  @ViewChild(SrTabs) tabs: SrTabs;
  @ViewChild(SrSetCurrent) currentComponent: SrSetCurrent;

  @Input() pedalboard : Pedalboard;
  @Output() onCurrentChange = new EventEmitter();
  @Output() onEffectChange = new EventEmitter();

  public currentEffect : Effect;

  private presenter: PedalboardPresenter;

  constructor(
      private element: ElementRef,
      private params : NavParams,
      private jsonService : JsonService,
      private ref: ApplicationRef
    ) {
    this.presenter = new PedalboardPresenter(this, jsonService);
  }

  ionViewDidLoad() {
    this.toPedalboard(this.pedalboard);
  }

  public toPedalboard(pedalboard : Pedalboard, effect? : Effect, notify=true) {
    this.currentComponent.current = pedalboard;
    this.pedalboard = pedalboard;
    this.ref.tick();

    if (notify) {
      this.presenter.requestSetCurrentPedalboard(this.pedalboard);
      this.onCurrentChange.emit(this.pedalboard);
    }

    this.setCurrentEffect(effect ? effect : this.pedalboard.effects[0]);
  }

  public setCurrentEffect(effect : Effect) {
    this.currentEffect = effect;

    if (!this.hasCurrentEffect)
      return;

    this.tabs.selectTab(effect.index);
    this.tabs.focusTab(effect.index);
  }

  public onParamUpdated(param : Lv2Param, newValue : number) {
    this.presenter.requestUpdateParam(param, newValue);
    console.log(`Param ${param.data.name}: ${param.value}`);
  }

  public toggleEffectStatus(effect : Effect) {
    this.presenter.requestToggleStatusEffect(effect);
  }

  public get hasCurrentEffect() {
    return this.currentEffect !== undefined;
  }

  public get currentEffectStatus() {
    if (this.hasCurrentEffect)
      return this.currentEffect.active;
    else
      return false;
  }

  public setCurrentEffectByIndex(index : number) {
    const effect = this.pedalboard.effects[index];
    this.setCurrentEffect(effect);

    this.onEffectChange.emit(effect);
  }

  getNativeElement() {
    return this.element.nativeElement;
  }
}
