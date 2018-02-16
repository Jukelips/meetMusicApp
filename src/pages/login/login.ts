import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  login: LoginPage;
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  goTo(page) {
    if (page === 'home') {
      this.navCtrl.push(HomePage);
    }
  }

  back() {
    if (this.navCtrl.length() >= 2) {
      this.navCtrl.pop();
    }
  }

}
