import {
  Component,
  Output,
  EventEmitter
} from '@angular/core';
import {Pedalboard} from '../../plugins-manager/model/pedalboard';
import {Bank} from '../../plugins-manager/model/bank';

@Component({
  selector: 'sr-set-current',
  templateUrl: 'sr-set-current.html'
})
export class SrSetCurrent {

  private pedalboard : Pedalboard;
  public next : Pedalboard;
  public before : Pedalboard;

  @Output() onChange = new EventEmitter();

  constructor() {
    const bank = new Bank('Bank');
    this.pedalboard = new Pedalboard('Current pedalboard');
    this.before = new Pedalboard('Before pedalboard');
    this.next = new Pedalboard('Next pedalboard');

    this.pedalboard.bank = bank;
    this.next.bank = bank;
    this.before.bank = bank;

    bank.pedalboards.push(this.next);
    bank.pedalboards.push(this.pedalboard);
    bank.pedalboards.push(this.before);
  }

  public set current(current : Pedalboard) {
    this.pedalboard = current;
    this.before = this.calculeBefore();
    this.next = this.calculeNext();
  }

  public get current() {
    return this.pedalboard;
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

  private calculeBefore() : Pedalboard {
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
    return this.totalInCurrentBank > 2
        || this.current != this.first;
  }

  private calculeNext() : Pedalboard {
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
    return this.totalInCurrentBank > 2
        || (this.totalInCurrentBank == 2 && this.current != this.second);
  }

  public toNext() {
    this.onChange.emit(this.next);
  }

  public toBefore() {
    this.onChange.emit(this.before);
  }
}
