import * as d3 from 'd3';


export class KeyboardManager {

  private events;
  private anyKeyAlreadyPressed : boolean = false;

  constructor(window) {
    this.events = {};

    d3.select(window)
      .on("keydown", () => this.keyDown())
      .on("keyup", () => this.keyUp());
  }

  register(key : number, action : () => void) : void {
    this.events[key] = action;
  }

  private keyDown() {
    if (this.anyKeyAlreadyPressed)
      return;

    this.anyKeyAlreadyPressed = true;

    const action = this.events[d3.event.keyCode]

    if (action != undefined)
      action();
  }

  private keyUp() {
    this.anyKeyAlreadyPressed = false;
  }
}
