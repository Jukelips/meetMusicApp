import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import 'rxjs/add/operator/map';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { PreferencesPage } from "../pages/preferences/preferences";


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {RegisterPage} from "../pages/register/register";
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import {HttpClientModule} from "@angular/common/http";
import { LoginPageModule} from "../pages/login/login.module";
import { RestServiceProvider } from '../providers/rest-service/rest-service';
import {ProfilPage} from "../pages/profil/profil";
import { UserServiceProvider } from '../providers/user-service/user-service';
import { ConfigServiceProvider } from '../providers/config-service/config-service';
import { BaseServiceProvider } from '../providers/base-service/base-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    RegisterPage,
    PreferencesPage,
    ProfilPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    LoginPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    PreferencesPage,
    RegisterPage,
    ProfilPage
  ],
  providers: [
    StatusBar,
    AuthServiceProvider,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestServiceProvider,
    UserServiceProvider,
    ConfigServiceProvider,
    BaseServiceProvider
  ]
})
export class AppModule {}
