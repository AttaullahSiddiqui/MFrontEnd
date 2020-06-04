import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2TelInputModule } from 'ng2-tel-input';

import { PublicRoutingModule } from './public-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CompleteProfileComponent } from './complete-profile/complete-profile.component';
import { PhoneVerficationComponent } from './phone-verfication/phone-verfication.component';
import { NotFound404Component } from './not-found404/not-found404.component';
import { AccountStatusComponent } from './account-status/account-status.component';
import { HomeComponent, HeaderComponent, FooterComponent, MiddleComponent } from './home';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


@NgModule({
  declarations: [
    LoginComponent, 
    SignupComponent, 
    CompleteProfileComponent, 
    PhoneVerficationComponent, 
    NotFound404Component, 
    AccountStatusComponent,
    HomeComponent, HeaderComponent, FooterComponent, MiddleComponent, ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2TelInputModule
  ]
})
export class PublicModule { }
