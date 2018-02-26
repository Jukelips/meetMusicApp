import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {LoginPage} from "../login/login";
import {UserRegistration, UserServiceProvider} from '../../providers/user-service/user-service';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;
  registration: UserRegistration = { id : '',username: '', password: '',firstName:'',lastName:'',
    email:'',gender: null,avatarUrl:'',phone:'',birthDate:'',description:'',latitude:'',longitude:''};

  constructor(private userService: UserServiceProvider,public navCtrl: NavController,
              public navParams: NavParams, private auth: AuthServiceProvider, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }


  /**Header a envoyer pour inscription**/
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
  registerUser({ value, valid }: { value: UserRegistration, valid: boolean })
  {
    this.submitted = true;
    this.isRequesting = true;
    this.errors='';
    valid = this.submitted;
    value=this.registration;
    if(valid)
    {
      this.userService.register(value.birthDate,value.email,value.gender,value.password,value.phone,value.username)
        .finally(() => this.isRequesting = false)
        .subscribe(
          result  => {if(result){
            this.navCtrl.push(LoginPage,{queryParams: {brandNew: true,email:value.email}});
          }},
          errors =>  this.errors = errors);
    }

  }

  //genre avec password et username avec birthdate

  /*public register() {
    this.auth.register(this.registerCredentials).subscribe(success => {
        if (success) {
          this.createSuccess = true;
          this.showPopup("Success", "Compte créé");
        } else {
          this.showPopup("Error", "Un problème est survenue lros de la création du compte");
        }
      },
      error => {
        this.showPopup("Error", error);
      });
  }*/

 /* public showPopup(title, text){
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.navCtrl.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }*/

}
