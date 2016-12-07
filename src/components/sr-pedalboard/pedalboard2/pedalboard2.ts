import {PedalboardView} from './pedalboard-view';
import {Effect} from './model/effect';


export class Pedalboard {
  private effectIndex = 0;

  private view : PedalboardView;
  private effects : Array<Effect>;
  //private connections : Array<Connection>;

  constructor(svgElement) {
    this.view = new PedalboardView(svgElement);
  }

  addEffect(effect : Effect) {
    effect.id = this.effectIndex++;
    effect.onSelectedListener = (effect : Effect) => this.select(effect);
    effect.onDragListener = (effect : Effect) => this.view.updateEffects(this.effects);

    this.effects.push(effect);
    this.view.updateEffects(this.effects);
  }

  private select(object) {
    this.view.select(object);
  }
}
