import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { InAppBrowser} from "@ionic-native/in-app-browser";
import 'rxjs/add/operator/map';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { PreferencesPage } from "../pages/preferences/preferences";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RegisterPage } from "../pages/register/register";
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { HttpClientModule } from "@angular/common/http";
import { LoginPageModule} from "../pages/login/login.module";
import { RestServiceProvider } from '../providers/rest-service/rest-service';
import { MpPageModule } from "../pages/mp/mp.module";
import {ProfilPage} from "../pages/profil/profil";
import { UserServiceProvider } from '../providers/user-service/user-service';
import { ConfigServiceProvider } from '../providers/config-service/config-service';
import { BaseServiceProvider } from '../providers/base-service/base-service';
import {MatchPage} from "../pages/match/match";
import { MatchServiceProvider } from '../providers/match-service/match-service';
import {LocationServiceProvider} from "../providers/location-service/location-service";
import {BackgroundGeolocation} from "@ionic-native/background-geolocation";
import { Geolocation} from "@ionic-native/geolocation";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    RegisterPage,
    PreferencesPage,
    ProfilPage,
    MatchPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    LoginPageModule,
    MpPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    PreferencesPage,
    RegisterPage,
    ProfilPage,
    MatchPage
  ],
  providers: [
    StatusBar,
    AuthServiceProvider,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    InAppBrowser,
    RestServiceProvider,
    UserServiceProvider,
    ConfigServiceProvider,
    BaseServiceProvider,
    MatchServiceProvider,
    LocationServiceProvider,
    BackgroundGeolocation,
    Geolocation
  ]
})
export class AppModule {}
