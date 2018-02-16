import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginPage} from "../login/login";

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
    } /*else if (page === 'contact') {
      this.navCtrl.push(ContactPage);
    }*/
  }

  back() {
    if (this.navCtrl.length() >= 2) {
      this.navCtrl.pop();
    }
  }


}
