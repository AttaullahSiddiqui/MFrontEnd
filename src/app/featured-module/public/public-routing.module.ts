import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthService } from '@app/core';

import { LoginComponent } from './login/login.component';
import { CompleteProfileComponent } from './complete-profile/complete-profile.component';
import { PhoneVerficationComponent } from './phone-verfication/phone-verfication.component';
import { SignupComponent } from './signup/signup.component';
import { NotFound404Component } from './not-found404/not-found404.component';
import { AccountStatusComponent } from './account-status/account-status.component';
import { HomeComponent } from './home';

const routes: Routes = [{
  path: 'home',
  component: HomeComponent
}, {
  path: 'home/:id',
  component: HomeComponent
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'login/:plan',
  component: LoginComponent
},
{
  path: 'login/:plan/:id',
  component: LoginComponent
},
{
  path: 'compelete-profile',
  component: CompleteProfileComponent,
  canActivate: [AuthService]
},
{
  path: 'phone-verification',
  component: PhoneVerficationComponent,
  canActivate: [AuthService]
},
{
  path: 'signup',
  component: SignupComponent
},
{
  path: 'account-status/:type',
  component: AccountStatusComponent,
  canActivate: [AuthService]
}, {
  path: 'not-found',
  component: NotFound404Component
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
