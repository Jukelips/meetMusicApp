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

  sexe :string;
  currentUser: UserRegistration = {
    id: '', username: '', password: '', firstName: '', lastName: '',
    email: '', gender: null, avatarUrl: '', phone: '', birthDate: '', description: '', latitude: '', longitude: ''
  };

  constructor(private userService: UserServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
    console.log("Constructeur Profil");
    let userData = JSON.parse(localStorage.getItem('data'));
    this.currentUser.email = userData.email;
    this.currentUser.username = userData.username;
    this.currentUser.description = userData.description;
    this.currentUser.gender = userData.gender;
    if(userData.gender ==1){
      this.sexe = "Homme";
    }else{
      this.sexe ="Femme";
    }
    this.currentUser.birthDate = userData.birthDate.split('T')[0];
    console.log(userData.username);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
  }

  back() {
    if (this.navCtrl.length() >= 2) {
      this.navCtrl.pop();
    }
  }
}
