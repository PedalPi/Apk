import {Component} from '@angular/core';
import {ionicBootstrap, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

import {HomePage} from './pages/home/home';

import {JsonService} from './service/json-service';

// Add operators
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'build/app.html', /* <ion-nav [root]="rootPage"></ion-nav> */
  providers: [JsonService]
})
class MyApp {
  rootPage: any = HomePage;

  constructor(private platform: Platform) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp);
