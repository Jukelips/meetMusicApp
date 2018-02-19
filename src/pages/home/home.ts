import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {PreferencesPage} from "../preferences/preferences";
import {RegisterPage} from "../register/register";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username = '';
  email = '';

  constructor(public navCtrl: NavController,public auth: AuthServiceProvider) {
    console.log("sqmldqljdqsjldqsdjlqskdqdslkj" + this.auth.getUserInfo());
    let info = this.auth.getUserInfo();
    this.username = info['name'];
    this.email = info['email'];
  }

  goTo(page) {
    if (page === 'LoginPage') {
      this.navCtrl.push(LoginPage);
    }else if (page === 'LreferencesPage') {
      this.navCtrl.push(PreferencesPage);
    }else if (page === 'RegisterPage') {
      this.navCtrl.push(RegisterPage);
    }else if (page === 'HomePage') {
      this.navCtrl.push(HomePage);
    }

  }

  back() {
    if (this.navCtrl.length() >= 2) {
      this.navCtrl.pop();
    }
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
      this.navCtrl.setRoot('LoginPage')
    });
  }


}
