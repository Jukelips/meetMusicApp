import {HttpClient, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import { BehaviorSubject } from 'rxjs/Rx';
import {BaseServiceProvider} from "../base-service/base-service";
import {ConfigServiceProvider} from "../config-service/config-service";
import 'rxjs/add/operator/map';
//import {Header} from "ionic-angular";
import {Headers, RequestOptions} from "@angular/http";
import {LoadingController} from "ionic-angular";
import {LocationServiceProvider} from "../location-service/location-service";
/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class UserServiceProvider extends BaseServiceProvider {

  baseUrl: string = "";
  longitude: number = 0;
  latitude: number = 0;
  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private  loggedIn ;

  public headers: any = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  constructor(public http: HttpClient, private configService: ConfigServiceProvider, public loadingCtrl: LoadingController, public locService: LocationServiceProvider) { //private configService: ConfigServiceProvider
    super();
    this.loggedIn = !!localStorage.getItem('token');
    // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
    // header component resulting in authed user nav links disappearing despite the fact user is still logged in
    this._authNavStatusSource.next(this.loggedIn);
    this.baseUrl = configService.getApiURI();
    this.locService.getLatlng();
  }
  register(birthDate: string, email: string, gender: number,
           password: string, phone : string, username: string): Observable<UserRegistration>
  {
    let lat: number = this.locService.getLong();
    let lng: number = this.locService.getLat();


    /**
     * Trouver un moyen pour ne plus rentre ces valeurs en dur dans l'appel, c'est crade*/
    let description = "description";
    let firstName = "ciprian";
    let lastName = "test";


    let body = JSON.stringify({birthDate, description, email,
      firstName, gender, lastName, lat, lng, password, phone, username});

    console.log(body);
    return this.http.post('/api' + "/user", body, {headers: new HttpHeaders({'Content-Type':  'application/json','Access-Control-Allow-Origin':'*'})})
      .map(res => true)
      .catch(this.handleError);
  }


  /*https://forum.ionicframework.com/t/http-post-not-sending-data/47452/7*/
  login(username, password){

    console.log("On est dans Login service");//******
    let body = { username, password};
    return this.http
      .post(
        '/api' + "/token",
        JSON.stringify(body),  {headers: new HttpHeaders({'Content-Type':  'application/json','Access-Control-Allow-Origin':'*'})})
      .map((response : LeToken ) => {
        this.loggedIn = true;
        this.loading();
        localStorage.setItem('token', response.token);
        this._authNavStatusSource.next(true);
        return true;
      })
      .catch(this.handleError);

    //this.http.put('/api/user/' + 'token/' '/')


  }

  loading(){
    let message;
    if(this.loggedIn){
      message = "Connexion...";
      this.loggedIn = true;
    }
    else{
      message = "Déconnexion...";
      this.loggedIn = false;
    }
    let loading = this.loadingCtrl.create({
      content: message,
      duration: 500
    });
    loading.present();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('data');
    this.loggedIn = false;
    this._authNavStatusSource.next(false);
    this.loading();
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  // si on veut afficher les infos pour un user usr sa page profil.
  getUserDetails(): Observable<UserRegistration> {
    console.log("on est dans userdetails");

    let base64 =localStorage.getItem('token');
    let tabToken =base64.split('.');
    let base64todecod = tabToken[0]+tabToken[1];
    let userId = atob(base64todecod);

    console.log(userId);
    let idUser =userId.match("\\w{8}-\\w{4}-\\w{4}-\\w{4}-\\w{12}");
    console.log(idUser[0]);
    console.log(base64);

    this.updateLatLngUser(idUser[0]);

    return this.http.get( "/api/user/"+ idUser[0],{headers: new HttpHeaders({'Content-Type':  'application/json','Access-Control-Allow-Origin':'*','Authorization' : 'Bearer '+ base64})})
      .map((res) => {
      console.log("get user detail");
        localStorage.setItem('data', JSON.stringify(res));
        return res;
      })
      .catch(this.handleError);
  }


  setLoggedIn(val){
    this.loggedIn=val;
  }

  setUserGenre(artists) {
    console.log("On est dans usergenre service");//******
    console.log(JSON.stringify(artists));
    let body = { artists };
    let base64 =localStorage.getItem('token');
    let tabToken =base64.split('.');
    let base64todecod = tabToken[0]+tabToken[1];
    let userId = atob(base64todecod);
    let idUser =userId.match("\\w{8}-\\w{4}-\\w{4}-\\w{4}-\\w{12}");


    return this.http
      .put(
        '/api' + "/user/"+idUser+"/synchronize/tastes",
        JSON.stringify(body),  {headers: new HttpHeaders({'Content-Type':  'application/json','Access-Control-Allow-Origin':'*'})})
      .map((response ) => {
        console.log("c'est ok");
        return true;
      })
      .catch(this.handleError);
  }

  updateLatLngUser(user) {

    let body = { user };
    let lat: number = this.locService.getLong();
    let lng: number = this.locService.getLat();

    console.log("test test url : " + '/api' + "/user/"+user + "/position/" + lat + "/" + lng)
    return this.http
      .put(
        '/api' + "/user/"+user + "/position/" + lat + "/" + lng,
      JSON.stringify(body), {headers: new HttpHeaders({'Content-Type':  'application/json','Access-Control-Allow-Origin':'*'})})
      .map((response ) => {
        console.log("c'est ok");
        return true;
      })
      .catch(this.handleError);

  }



}

export interface Credentials {
  username: string;
  password: string;
}

export interface UserRegistration {
  avatarUrl: string;
  birthDate: string;
  description: string;
  email: string;
  firstName: string;
  gender: number;
  id: string;
  lastName: string;
  latitude: string;
  longitude: string;
  password: string;
  phone : string;
  username: string;
}

interface LeToken {
  token : string
}
