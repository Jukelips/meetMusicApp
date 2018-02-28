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
              public navParams: NavParams){
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

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
}
