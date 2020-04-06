import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CompleteProfileComponent } from './complete-profile/complete-profile.component';
import { PhoneVerficationComponent } from './phone-verfication/phone-verfication.component';
import { NotFound404Component } from './not-found404/not-found404.component';


@NgModule({
  declarations: [LoginComponent, SignupComponent, CompleteProfileComponent, PhoneVerficationComponent, NotFound404Component],
  imports: [
    CommonModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
