import { Component, ViewChild } from '@angular/core';
import {Events, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {LoginPage} from "../pages/login/login";
import {PreferencesPage} from "../pages/preferences/preferences";
import { RegisterPage } from "../pages/register/register";
import { MpPage } from "../pages/mp/mp";
import {ProfilPage} from "../pages/profil/profil";
import 'rxjs/add/operator/map';
import {UserServiceProvider} from "../providers/user-service/user-service";
import {MatchPage} from "../pages/match/match";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  connect: boolean;

  rootPage: any = HomePage;

  pages: Array<{title: string, icon: any, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public events: Events, private userService: UserServiceProvider) {
    this.initializeApp();
    events.subscribe('user:connected', time => {
      this.refreshSlide();
    });
  }

  refreshSlide(){
    this.connect = this.userService.isLoggedIn();
    console.log("current value of connect "  + this.connect);

    if (this.connect == false) {
      this.pages = [
        { title: 'Home', icon: 'home', component: HomePage},
        { title: 'Se connecter', icon:'lock', component: LoginPage},
        { title: 'Inscription', icon:'md-create', component: RegisterPage},
        { title: 'Matchs',  icon: 'md-people', component: MatchPage}
      ];
    } else {
      this.pages = [
        { title: 'Home', icon: 'md-home', component: HomePage},
        { title: 'Profil', icon:'md-contact', component: ProfilPage},
        { title: 'Preferences',icon: 'md-settings', component: PreferencesPage },
        { title: 'Messages privés', icon:'md-mail', component: MpPage}
      ];
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.refreshSlide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
