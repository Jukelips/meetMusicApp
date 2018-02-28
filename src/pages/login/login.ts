import { Component } from '@angular/core';
import {
  AlertController, IonicPage, Loading, LoadingController, MenuController, NavController,
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
  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;
  credentials: Credentials = { username: '', password: '' };

  constructor(private userService: UserServiceProvider,public navCtrl: NavController, public navParams: NavParams,
              menuCtrl : MenuController, private auth :  AuthServiceProvider,
              private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    console.log("constructor login");
  }

  /*destroy() {
    // prevent memory leak by unsubscribing
    this.subscription.unsubscribe();
  }*/


  login({ value, valid }: { value: Credentials, valid: boolean }) {
    console.log("On est dans login");
    console.log("Credentials username : " + this.credentials.username + "\n password : " + this.credentials.password + " Valid :" + valid );
    this.submitted = true;
    this.isRequesting = true;
    this.errors='';
    value = this.credentials;
    valid = true;
    if (valid) {
      console.log("On est dans valide login");
      console.log("username : " + value.username + "\n password : " + value.password + " Valid :" + valid );
      this.userService.login(value.username, value.password)
        .finally(() => this.isRequesting = false)
        .subscribe(
          result => {
            if (result) {
              this.auth.isConnected = true;
            }
          },
          error => this.errors = "Identifiants invalides");
      this.isRequesting = true;
      if(this.userService.isLoggedIn()){
      this.userService.getUserDetails()._finally(()=>this.isRequesting = false).subscribe(result =>{
        if(result){
          this.auth.setUserInfo(result.username,result.email);
          this.navCtrl.push(HomePage);
        }
      })
    }}

  }


  public createAccount() {
    this.navCtrl.push(RegisterPage);
  }

  /*public login() {
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(allowed => {
        if (allowed) {
          this.navCtrl.push(HomePage);
        } else {
          this.showError("Access Denied");
        }
      },
      error => {
        this.showError(error);
      });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Veuillez patienter',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }*/

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
