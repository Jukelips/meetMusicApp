import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {PreferencesPage} from "../preferences/preferences";
import {RegisterPage} from "../register/register";
import { InAppBrowser,InAppBrowserOptions  } from '@ionic-native/in-app-browser';
import {HttpClient} from "@angular/common/http";
import { MpPage } from "../mp/mp";
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {ProfilPage} from "../profil/profil";

//var client_id = 'db770f92f6ef4f3f87df6c6ec279c934'; // Your client id
//var client_secret = '3246f992f0ec4c3fa71410ef32cf0bda'; // Your secret
var token;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username = '';
  email = '';
  connect : boolean;

  constructor(private http: HttpClient,private inAppBrowser : InAppBrowser,private platform : Platform,private navCtrl: NavController, private userProvider : UserServiceProvider) {
    this.connect = userProvider.isLoggedIn();
    if(this.connect){
      this.userProvider.getUserDetails().subscribe((res)=>{
        console.log(" sdf sdfsdfsfsdfsf "+res);
      });
    }
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
    }else if (page === 'MpPage') {
      this.navCtrl.push(MpPage);
    } else if (page === 'ProfilPage') {
      this.navCtrl.push(ProfilPage);
    }

  }

  back() {
    if (this.navCtrl.length() >= 2) {
      this.navCtrl.pop();
    }
  }

  public logout() {
    this.userProvider.logout();
    this.navCtrl.setRoot(HomePage);
  }

  public login() {
    if(this.platform.ready()){
       this.openWebpage();
    }
  };


  openWebpage() {
    const options: InAppBrowserOptions = {
      zoom: 'no'
    }
    const clientId = "db770f92f6ef4f3f87df6c6ec279c934";
    const url = `https://accounts.spotify.com/authorize/?client_id=${clientId}` +
      "&response_type=token" +
      "&redirect_uri=http://localhost:8100/" +
      "&scope=user-read-private user-read-email playlist-read-private user-library-read user-read-birthdate user-top-read";
    // Opening a URL and returning an InAppBrowserObject
    const browser = this.inAppBrowser.create(url, '_self', options);
    let responseParams: string[];
    browser.on("loadstart").subscribe((evt) => {
      if ((evt.url).indexOf("http://localhost:8100/") === 0) {
        console.log(evt.url);
        responseParams = ((evt.url).split("#")[1]).split("&");
        token=responseParams[0].split("=")[1];
        console.log(token);
        browser.close();
      }
    });

    browser.on("exit").subscribe((evt)=>{
      console.log("ça ferme  "+ token);
      this.callback();
    })
  }

  callback(){
    console.log('on est callback');
    this.getUserTop("artists");
  }

  getUserInfo(token){

    this.http.get('https://api.spotify.com/v1/me',{headers :{'Authorization':'Bearer ' + token}}).subscribe((evt)=>{
      console.log(JSON.stringify(evt));
    })


  }

  getUserTop(type){
    let userData;
    if(token !=null){
    this.http.get('https://api.spotify.com/v1/me/top/'+type+'?limit=50',{headers :{'Authorization':'Bearer ' + token}}).subscribe((evt : UserData)=>{
      userData = evt.items;
      this.userProvider.setUserGenre(userData);
    });

   }else{
      console.log("tu dois te co");
    }

  }
}

interface UserData{
  items: {
    [key: string] : UserTrack
  };
}


interface UserTrack {
  name : string,
  genres : string[]
}


