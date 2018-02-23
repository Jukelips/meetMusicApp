import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PreferencesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-preferences',
  templateUrl: 'preferences.html',
})
export class PreferencesPage {

  brightness: number = 20;
  contrast: number = 0;
  warmth: number = 1300;
  structure: any = { lower: 33, upper: 60 };
  text: number = 0;
  dualValue2 = {lower: 18, upper: 80};
  valueMin: number;
  valueMax: number;
  range: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.valueMin = this.dualValue2.lower;
    this.valueMax = this.dualValue2.upper;

  }

  rangeChange(range: Range) {
    this.valueMin = this.dualValue2.lower;
    this.valueMax = this.dualValue2.upper;


  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PreferencesPage');
  }

}
