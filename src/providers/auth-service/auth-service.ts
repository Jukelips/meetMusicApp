  import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


export class User{
  name: string;
  email: string;

  constructor(name: string, email: string) {

    this.name = name;
    this.email = email;
  }
}


@Injectable()
export class AuthServiceProvider {

  currentUser: User;
  isConnected : boolean;

  constructor(public http: HttpClient) {
    console.log('Hello AuthServiceProvider Provider');
    this.isConnected = false;
  }

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Merci de renseigner les informations");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        let access = (credentials.password === "pass" && credentials.email === "email");
        this.currentUser = new User('chemeury', 'meetmusic@ynov.com');
        this.isConnected = true;
        observer.next(access);
        observer.complete();
      });
    }
  }

  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Merci de renseigner les informations");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public getUserInfo() : User {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      this.isConnected = false;
      observer.next(true);
      observer.complete();
    });
  }
}
