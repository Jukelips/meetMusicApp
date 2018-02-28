import { Injectable } from '@angular/core';

/*
  Generated class for the ConfigServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConfigServiceProvider {

  _apiURI : string;

  constructor() {
    this._apiURI = "http://54.38.33.198/api";
  }

  getApiURI() {
    return this._apiURI;
  }
}
