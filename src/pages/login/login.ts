import { Component } from '@angular/core';
import {
  AlertController, Events, IonicPage, Loading, LoadingController, MenuController, NavController,
  NavParams
} from 'ionic-angular';
import {HomePage} from "../home/home";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {RegisterPage} from "../register/register";
import {Credentials, UserServiceProvider} from '../../providers/user-service/user-service';
import { Subscription } from 'rxjs';
import {LocationServiceProvider} from "../../providers/location-service/location-service";

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
  loading: Loading;
  isConnected: boolean;
  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;
  credentials: Credentials = { username: '', password: '' };

  constructor(private userService: UserServiceProvider,public navCtrl: NavController, public navParams: NavParams, public events: Events,
              menuCtrl : MenuController, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {

  }

  login({ value, valid }: { value: Credentials, valid: boolean }) {
    this.submitted = true;
    this.isRequesting = true;
    this.errors='';
    value = this.credentials;
    valid = true;
    if (valid) {
      this.userService.login(value.username, value.password)
        .finally(() => this.isRequesting = false)
        .subscribe(
          result => {
            if (result) {
              this.isConnected = this.userService.isLoggedIn();
              this.navCtrl.setRoot(HomePage);
              this.navCtrl.popToRoot();
              this.events.publish('user:connected', Date.now());
            }
          },
          error => this.showAlert());
      this.isRequesting = true;
      }
  }



  public showAlert(){
    //this.loading.dismiss();
    let alert = this.alertCtrl.create({
      title: 'Erreur lors de l\'authentification',
      subTitle: 'Le nom d\'utilisateur et/ou le mot de passe est incorrect',
      buttons: ['OK']
    });
    alert.present();

  }

  public createAccount() {
    this.navCtrl.push(RegisterPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  goTo(page) {
    if (page === 'HomePage') {
      this.navCtrl.push(HomePage);
    }
  }

  back() {
    if (this.navCtrl.length() >= 2) {
      this.navCtrl.pop();
    }
  }

}
