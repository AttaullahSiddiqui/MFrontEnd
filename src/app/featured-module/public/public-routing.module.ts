import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { NotFound404Component } from './not-found404/not-found404.component';
import { CompleteProfileComponent } from './complete-profile/complete-profile.component';
import { PhoneVerficationComponent } from './phone-verfication/phone-verfication.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [{
  path: 'login',
  component: LoginComponent
}
,
{
  path: 'compeleteprofile',
  component: CompleteProfileComponent
}
,
{
  path: 'phone-verification',
  component: PhoneVerficationComponent
},
{
  path: 'signup',
  component: SignupComponent
},

{
  path: 'not-found',
  component: NotFound404Component
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
