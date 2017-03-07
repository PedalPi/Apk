export interface Fragment {
  getNativeElement() : Element;

  ionViewDidLoad?();
  ionViewWillEnter?();
  ionViewWillLeave?();
  ionViewWillUnload?();
}
