import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {LoginPage} from "../pages/login/login";
import {PreferencesPage} from "../pages/preferences/preferences";
import { RegisterPage } from "../pages/register/register";
import { AuthServiceProvider } from "../providers/auth-service/auth-service";
import { MpPage } from "../pages/mp/mp";
import {ProfilPage} from "../pages/profil/profil";
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  //rootPage: any = 'LoginPage';

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private auth: AuthServiceProvider) {
    this.initializeApp();
    //process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    if (auth.isConnected == false) {
      this.pages = [
        { title: 'Home', icon: 'md-home', component: HomePage },
        {title: 'Se connecter', icon:'lock', component: LoginPage},
        { title: 'Profil', icon:'md-contact', component: ProfilPage },
        {title: 'Inscription', icon:'md-create', component: RegisterPage},
        { title: 'Preferences', icon: 'md-settings', component: PreferencesPage }
      ];
    } else {
      this.pages = [
        { title: 'Home', icon: 'md-home', component: HomePage },
        { title: 'Profil', icon:'md-contact', component: ProfilPage },
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
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(HomePage);
  }
}
