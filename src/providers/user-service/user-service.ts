import {HttpClient, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import { BehaviorSubject } from 'rxjs/Rx';
import {BaseServiceProvider} from "../base-service/base-service";
import {ConfigServiceProvider} from "../config-service/config-service";
import 'rxjs/add/operator/map';
//import {Header} from "ionic-angular";
import {Headers, RequestOptions} from "@angular/http";
import {HomePage} from "../../pages/home/home";
import {NavController} from "ionic-angular";
/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class UserServiceProvider extends BaseServiceProvider {

  baseUrl: string = "";
  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private loggedIn = false;

  public headers: any = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  constructor(public http: HttpClient, private configService: ConfigServiceProvider) { //private configService: ConfigServiceProvider
    super();
    this.loggedIn = !!localStorage.getItem('token');
    // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
    // header component resulting in authed user nav links disappearing despite the fact user is still logged in
    this._authNavStatusSource.next(this.loggedIn);
    this.baseUrl = configService.getApiURI();
  }

  register(birthDate: string, email: string, gender: number,
           password: string, phone : string, username: string): Observable<UserRegistration>
  {
    let description = "description";
    let firstName = "ciprian";
    let lastName = "test";
    let longitude = "1,34566";
    let latitude = "2,345678";

    let body = JSON.stringify({birthDate, description, email,
      firstName, gender, lastName, latitude, longitude, password, phone, username});
    return this.http.post('/api' + "/user", body, {headers: new HttpHeaders({'Content-Type':  'application/json','Access-Control-Allow-Origin':'*'})})
      .map(res => true)
      .catch(this.handleError);
  }

  login(username, password){
    let body = { username, password };
    return this.http
      .post(
        '/api' + "/token",
        JSON.stringify(body),  {headers: new HttpHeaders({'Content-Type':  'application/json','Access-Control-Allow-Origin':'*'})})
      .map((response: Response) => {
        localStorage.setItem('token', response);
        this.loggedIn = true;
        this._authNavStatusSource.next(true);
        return true;
      })
      .catch(this.handleError);
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this._authNavStatusSource.next(false);
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  // si on veut afficher les infos pour un user usr sa page profil.
  getUserDetails(): Observable<UserRegistration> {
    console.log("User details method");
    let authToken = localStorage.getItem('token');
    console.log(authToken);
    return this.http.get('/api' + "/user",{headers: new HttpHeaders({'Content-Type': 'application/json','Access-Control-Allow-Origin':'*','Authorization':'Bearer '+ {authToken}})})
      .map((response: Response) => {
        localStorage.setItem('data', response);
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
