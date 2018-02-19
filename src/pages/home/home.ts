import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {PreferencesPage} from "../preferences/preferences";
import {RegisterPage} from "../register/register";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goTo(page) {
    if (page === 'login') {
      this.navCtrl.push(LoginPage);
    }else if (page === 'preferences') {
      this.navCtrl.push(PreferencesPage);
    }else if (page === 'register') {
      this.navCtrl.push(RegisterPage);
    }
  }

  back() {
    if (this.navCtrl.length() >= 2) {
      this.navCtrl.pop();
    }
  }


}
