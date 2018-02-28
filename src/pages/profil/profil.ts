import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserRegistration, UserServiceProvider} from "../../providers/user-service/user-service";

/**
 * Generated class for the ProfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage {

  currentUser: UserRegistration = {
    id: '', username: '', password: '', firstName: '', lastName: '',
    email: '', gender: null, avatarUrl: '', phone: '', birthDate: '', description: '', latitude: '', longitude: ''
  };



  constructor(private userService: UserServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
    console.log("Constructeur Profil");
    console.log("currentUser : " + this.currentUser);
    console.log("currentUser 2 : " + this.currentUser.toString());
    userService.getUserDetails();
    let userData = localStorage.getItem('data');
    console.log(userData);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
  }

  ngOninit(){
  }

  back() {
    if (this.navCtrl.length() >= 2) {
      this.navCtrl.pop();
    }
  }
}
