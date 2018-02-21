import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {PreferencesPage} from "../preferences/preferences";
import {RegisterPage} from "../register/register";
import {AuthServiceProvider, User} from "../../providers/auth-service/auth-service";
import { InAppBrowser,InAppBrowserOptions  } from '@ionic-native/in-app-browser';
import {HTTP} from "@ionic-native/http";

var client_id = 'db770f92f6ef4f3f87df6c6ec279c934'; // Your client id
var client_secret = '3246f992f0ec4c3fa71410ef32cf0bda'; // Your secret

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username = '';
  email = '';

  constructor(private http: HTTP,private inAppBrowser : InAppBrowser,private platform : Platform,private navCtrl: NavController,private auth: AuthServiceProvider) {
    let info = this.auth.getUserInfo() == null ? new User('', '') : this.auth.getUserInfo() ;
    this.username = info['name'];
    this.email = info['email'];
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

  public login() {
    if(this.platform.ready()){
      var code = this.openWebpage();
      if (code != '') {
        this.callback(code);
      }
    }
  };


  openWebpage() {
    const options: InAppBrowserOptions = {
      zoom: 'no'
    }
    var codeAuth ='';
    const clientId = "db770f92f6ef4f3f87df6c6ec279c934";
    const url = `https://accounts.spotify.com/authorize/?client_id=${clientId}` +
      "&response_type=code" +
      "&redirect_uri=http://localhost:8100/" +
      "&scope=user-read-private user-read-email";
    // Opening a URL and returning an InAppBrowserObject
    const browser = this.inAppBrowser.create(url, '_self', options);
    let responseParams: string[];
    browser.on("loadstart").subscribe((evt) => {
      if ((evt.url).indexOf("http://localhost:8100/") === 0) {
        browser.close();
        console.log(evt.url);
        responseParams = ((evt.url).split("?")[1]).split("&");
        codeAuth=responseParams[0].split("=")[1];
        return codeAuth;
      }
    });

    return codeAuth;
  }

  callback( code){
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: "http://localhost:8100/",
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
      },
      json: true
    };

    this.http.post(authOptions.url,authOptions.form,authOptions.headers).then((data) => {
      console.log(data)});
  }
}
