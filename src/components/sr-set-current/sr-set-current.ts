import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {Pedalboard} from '../../plugins-manager/model/pedalboard';

@Component({
  selector: 'sr-set-current',
  templateUrl: 'sr-set-current.html'
})
export class SrSetCurrent {

  @Input() current: Pedalboard;
  @Output() onChange = new EventEmitter();

  get visible() : boolean {
    return this.totalInCurrentBank > 1;
  }

  private get bank() {
    return this.current.bank;
  }

  private get totalInCurrentBank() : number {
    return this.bank.pedalboards.length;
  }

  private get first() : Pedalboard {
    return this.bank.pedalboards[0];
  }

  private get second() : Pedalboard {
    return this.bank.pedalboards[1];
  }

  public get before() : Pedalboard {
    if (this.totalInCurrentBank == 2)
      return this.first;

    return this.getBeforePedalboardOf(this.current);
  }

  private getBeforePedalboardOf(pedalboard) : Pedalboard {
    const bank = pedalboard.bank

    let index = pedalboard.index - 1;
    if (index == -1)
      index = bank.pedalboards.length-1;

    return bank.pedalboards[index];
  }

  public get beforeEnabled() : boolean {
    return this.totalInCurrentBank != 2
        || this.current != this.first;
  }

  public get next() : Pedalboard {
    if (this.totalInCurrentBank == 2)
      return this.second;

    return this.getNextPedalboardOf(this.current);
  }

  private getNextPedalboardOf(pedalboard) : Pedalboard {
    const bank = pedalboard.bank

    let index = pedalboard.index + 1;
    if (index == bank.pedalboards.length)
      index = 0;

    return bank.pedalboards[index];
  }

  public get nextEnabled() : boolean {
    return this.totalInCurrentBank != 2
        || this.current != this.second;
  }

  public toNext() {
    this.onChange.emit(this.next);
  }

  public toBefore() {
    this.onChange.emit(this.before);
  }
}
