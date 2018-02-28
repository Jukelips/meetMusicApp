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
  brandNew: boolean;
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
              this.navCtrl.popToRoot(HomePage);
              this.events.publish('user:connected', Date.now());
            }
          },
          error => this.errors = this.showAlert());
      this.isRequesting = true;
      }
  }

  /* appel de userdetails dans login - Clement l'a deplacé dans le constructor home,
  * je le laisse ici pour l'instant si jamais on a besoin de le reprendre
  if(this.userService.isLoggedIn()){
  this.userService.getUserDetails()._finally(()=>this.isRequesting = false).subscribe(result =>{
})
}*/


  public showAlert(){
    this.loading.dismiss();
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
