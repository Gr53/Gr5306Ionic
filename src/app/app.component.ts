import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ReportPage } from '../pages/report/report';
import { NewsPage } from '../pages/news/news';
import { LoginPage } from '../pages/login/login';
import { OneSignal } from '@ionic-native/onesignal';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public oneSignal: OneSignal,
    public alertCtrl: AlertController,
    public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      //{ title: 'Home', component: HomePage },
      { title: 'Reportar Maltrato', component: ReportPage },
      { title: 'Lista Reportes', component: ListPage },
      { title: 'Noticias', component: NewsPage },
      { title: 'Salir', component: LoginPage } // temporal
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      //jj debug
      window["plugins"].OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

      var notificationOpenedCallback = function(jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      const alert = this.alertCtrl.create({
        title: jsonData.title,
        subTitle: jsonData.body,
        buttons: ['OK']
      });
      alert.present();
    
      };
  
      window["plugins"].OneSignal
        .startInit("097d4197-e408-408e-93ff-820844761c28", "554163196066")
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();


    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
