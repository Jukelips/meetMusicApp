import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {PreferencesPage} from "../preferences/preferences";
import {RegisterPage} from "../register/register";
import {AuthServiceProvider, User} from "../../providers/auth-service/auth-service";
import { InAppBrowser,InAppBrowserOptions  } from '@ionic-native/in-app-browser';
import {HttpClient,HttpHeaders} from "@angular/common/http";

//var client_id = 'db770f92f6ef4f3f87df6c6ec279c934'; // Your client id
//var client_secret = '3246f992f0ec4c3fa71410ef32cf0bda'; // Your secret
var token;
import { MpPage } from "../mp/mp";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username = '';
  email = '';

  constructor(private http: HttpClient,private inAppBrowser : InAppBrowser,private platform : Platform,private navCtrl: NavController,private auth: AuthServiceProvider) {

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
    }else if (page === 'MpPage') {
      this.navCtrl.push(MpPage);
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
    const headers = new HttpHeaders().set('Authorization','Basic ')
      .append('Content-Type',  'application/json')
      .append( 'Access-Control-Allow-Origin','*')
      .append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');

    console.log(JSON.stringify(headers));
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
      this.callback(token);
    })
  }

  callback( token){
    console.log('on est callback');
    this.getUserInfo(token);
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
      for(var i=0; i<50;i++) {
        console.log(evt.items[i].name);
        for(var j=0;j<evt.items[i].genres.length;j++){
          console.log(" - "+ evt.items[i].genres[j]);
        }
        console.log ("");
      }
      userData = evt;
    })
   }else{
      console.log("tu dois te co");
    }

  }




  /* authSpotify(code) {
console.log("on est authspotify");
    const url = "https://accounts.spotify.com/api/token";
    const data = {
      code: code,
      redirect_uri: "http://localhost:8100/",
      grant_type: 'authorization_code',
    };
     const headers = new HttpHeaders().set('Authorization','Basic ' + btoa(client_id + ':' + client_secret))
       .append('Content-Type',  'application/json')
       .append( 'Access-Control-Allow-Origin','*')
       .append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');

     //Setting multiple headers.
     var spotifyAuth = function(){
       //Make the HTTP Post Request
       this.http.post(url , data, {
         headers: new HttpHeaders({
           'Authorization':'Basic ' + btoa(client_id + ':' + client_secret),
           'Content-Type':  'application/json','Access-Control-Allow-Origin':'*',
           'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'})})
         .subscribe(
           result => {
             console.log(result);
           },
           err => {
             console.log("Error- something is wrong!")
           });
     }*/

  /*  return this.http.post(url, data, {headers :{'Authorization':'Basic ' + btoa(client_id + ':' + client_secret),'Content-Type':  'application/json','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'}})
   .pipe(
      catchError((err => this.handleError(err)))
    );*/

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


