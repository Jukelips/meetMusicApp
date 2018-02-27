import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {PreferencesPage} from "../preferences/preferences";
import {RegisterPage} from "../register/register";
import {AuthServiceProvider, User} from "../../providers/auth-service/auth-service";
import {ProfilPage} from "../profil/profil";
import {UserRegistration, UserServiceProvider} from "../../providers/user-service/user-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  connect : boolean;
  username = '';
  user: any;
  currentUser: UserRegistration = {
    id: '', username: '', password: '', firstName: '', lastName: '',
    email: '', gender: '', avatarUrl: '', phone: '', birthdate: '', description: '', latitude: '', longitude: ''
  };


  constructor(private navCtrl: NavController, userProvider : UserServiceProvider) {
    //let info = this.auth.getUserInfo() == null ? new User('', '') : this.auth.getUserInfo() ;
    this.currentUser = userProvider.getUserDetails();
    this.username = this.currentUser.username;
    this.connect = userProvider.isLoggedIn();
    this.user = userProvider;
  }

  goTo(page) {
    if (page === 'LoginPage') {
      this.navCtrl.push(LoginPage);
    }else if (page === 'PreferencesPage') {
      this.navCtrl.push(PreferencesPage);
    }else if (page === 'RegisterPage') {
      this.navCtrl.push(RegisterPage);
    }else if (page === 'HomePage') {
      this.navCtrl.push(HomePage);
    }else if (page === 'ProfilPage') {
      this.navCtrl.push(ProfilPage);
    }
  }

  back() {
    if (this.navCtrl.length() >= 2) {
      this.navCtrl.pop();
    }
  }

  public logout() {
    this.user.logout();
    this.navCtrl.push(HomePage);
  }

}
