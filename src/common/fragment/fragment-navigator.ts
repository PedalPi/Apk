import {Fragment} from './fragment';


export class FragmentNavigator {

  private stack : {fragment: Fragment, parameters: {}}[] = [];

  private fragments = {};

  get active() {
    let item = this.stack[this.stack.length-1];
    return item ? item.fragment : null;
  }

  public register(identifier, fragment : Fragment) {
    this.fragments[identifier] = fragment;

    this.hide(fragment);
  }

  public push(identifier, parameters={}) {
    let fragment = this.fragments[identifier];
    if (!fragment)
      throw `Fragment not defined for identifier ${identifier}. Please, register the fragment`;

    if (this.active) {
      this.callIonViewWillLeave(this.active);
      this.hideActive();
    }

    this.stack.push({fragment: fragment, parameters: parameters});

    this.callIonViewDidLoad(fragment);
    this.callIonViewWillEnter(fragment);

    this.show(fragment);
  }

  public pop() {
    const oldActive = this.active;
    if (!oldActive)
      return;

    this.callIonViewWillLeave(oldActive)
    this.callIonViewWillUnload(oldActive)

    this.hideActive();

    this.stack.splice(-1, 1);

    const newActive = this.active;
    this.callIonViewWillEnter(newActive);
    this.showActive();
  }

  public clearStack() {
    while (this.active)
      this.pop();
  }

  /**********************
   * View visibility
   **********************/
  private showActive() {
    let active = this.active;
    if (active)
      this.show(active);
  }

  private show(fragment : Fragment) {
    fragment.getNativeElement()
            .removeAttribute('hidden')
  }

  private hideActive() {
    let active = this.active;
    if (active != null)
      this.hide(active)
  }

  private hide(fragment: Fragment) {
    fragment.getNativeElement()
            .setAttribute('hidden', 'true');
  }
  /**********************
   * Fragments events
   **********************/
  private callIonViewDidLoad(fragment : Fragment) {
    if (fragment.ionViewDidLoad)
      fragment.ionViewDidLoad()
  }

  private callIonViewWillEnter(fragment : Fragment) {
    if (fragment.ionViewWillEnter)
      fragment.ionViewWillEnter()
  }

  private callIonViewWillLeave(fragment : Fragment) {
    if (fragment.ionViewWillLeave)
      fragment.ionViewWillLeave()
  }

  private callIonViewWillUnload(fragment : Fragment) {
    if (fragment.ionViewWillUnload)
      fragment.ionViewWillUnload()
  }
}
