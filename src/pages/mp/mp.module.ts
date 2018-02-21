import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MpPage } from './mp';

@NgModule({
  declarations: [
    MpPage,
  ],
  imports: [
    IonicPageModule.forChild(MpPage),
  ],
})
export class MpPageModule {}
