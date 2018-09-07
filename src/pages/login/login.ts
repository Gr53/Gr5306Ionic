import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Nav } from 'ionic-angular';

import { ReportPage } from '../report/report';
import { SignUpPage } from '../sign-up/sign-up';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AlertController } from 'ionic-angular';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @ViewChild(Nav) nav: Nav;

  respouceData: any;
  userData = {
    auth: {"email":"", "password":""}
  };


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authServiceProvider: AuthServiceProvider,
    public alertCtl: AlertController
  ) {
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  openLogin() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.setRoot(ReportPage);
  }

  goSignUp(){
    this.navCtrl.push(SignUpPage);
  }


  login(){
    this.authServiceProvider.postData(this.userData, "user_token").then((result) => {
      this.respouceData = result;
      console.log(this.respouceData);
      //localStorage.setItem('user', JSON.stringify(this.respouceData));
      //this.navCtrl.push(HomePage);
      this.navCtrl.setRoot(ReportPage);
    }, (err) => {
      console.log("error ___________________")
      let alert = this.alertCtl.create({
        title: 'Iniciar Sesión',
        subTitle: 'No se pudo iniciar sesión, por favor intente mas tarde.',
        buttons: ['Dismiss']
      });
      alert.present();
    });
  }



}
