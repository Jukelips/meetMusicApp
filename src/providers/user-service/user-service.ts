import {HttpClient, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import { BehaviorSubject } from 'rxjs/Rx';
import {BaseServiceProvider} from "../base-service/base-service";
import {ConfigServiceProvider} from "../config-service/config-service";
import 'rxjs/add/operator/map';
//import {Header} from "ionic-angular";
import {Headers, RequestOptions} from "@angular/http";
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

  /**proxy**/
  /*{
   "id": "00000000-0000-0000-0000-000000000000",
   "username": "ciprian69",
   "password": "P@ssword",
   "firstName": "Ciprian",
   "lastName": "Pintilie",
   "email": "ciprian@gmail.com",
   "gender": 1,
   "avatarUrl": "???",
   "phone": "1669696969",
   "birthDate": "1992-04-26T00:00:00",
   "description": "Back-end 4 life",
   "longitude": "1x",
   "latitude": "1x"
   }*/

/*
 avatarUrl
 birthdate	1
 description	description
 email	123ERT
 firstName	ciprian
 gender	0909090909
 id
 lastName	test
 latitude	2,345678
 longitude	1,34566
 password	cipripri
 username	cipripri@anal.com
 */

//(value.birthDate,value.email,value.gender,value.password,value.phone,value.username)
  register(birthDate: string, email: string, gender: number,
           password: string, phone : string, username: string): Observable<UserRegistration>
  {
    console.log("On est dans Register service");//******
    let id= "";
    let description = "description";
    let firstName = "ciprian";
    let lastName = "test";
    let avatarUrl = "";
    let longitude = "1,34566";
    let latitude = "2,345678"
    //let body = JSON.stringify({avatarUrl, birthDate, description, email,
      //firstName, gender, id, lastName, latitude, longitude, password, phone, username});

    let body = JSON.stringify({birthDate, description, email,
      firstName, gender, lastName, latitude, longitude, password, phone, username});
    return this.http.post('/api' + "/user", body, {headers: new HttpHeaders({'Content-Type':  'application/json','Access-Control-Allow-Origin':'*'})})
      .map(res => true)
      .catch(this.handleError);
  }


  /*https://forum.ionicframework.com/t/http-post-not-sending-data/47452/7*/
  login(username, password){
    console.log("On est dans Login service");//******
    let body = { username, password };
    return this.http
      .post(
        '/api' + "/token",
        JSON.stringify(body),  {headers: new HttpHeaders({'Content-Type':  'application/json','Access-Control-Allow-Origin':'*'})})
      .map((response: string) => {
        localStorage.setItem('token', response);
        console.log("response.toString() : " + response);
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
  /*getUserDetails(): Observable<UserRegistration> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('token');
    headers.append('Authorization', `Bearer ${authToken}`);

    return this.http.get(this.baseUrl + "/user",{headers})
      .map(res => res.json())
      .catch(this.handleError);
  }*/
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
/*
 avatarUrl
 birthdate	1
 description	description
 email	123ERT
 firstName	ciprian
 gender	0909090909
 id
 lastName	test
 latitude	2,345678
 longitude	1,34566
 password	cipripri
 username	cipripri@anal.com
 */



/*{
 "id": "00000000-0000-0000-0000-000000000000",
 "username": "ciprian69",
 "password": "P@ssword",
 "firstName": "Ciprian",
 "lastName": "Pintilie",
 "email": "ciprian@gmail.com",
 "gender": 1,
 "avatarUrl": "???",
 "phone": "1669696969",
 "birthDate": "1992-04-26T00:00:00",
 "description": "Back-end 4 life",
 "longitude": "1x",
 "latitude": "1x"*/
