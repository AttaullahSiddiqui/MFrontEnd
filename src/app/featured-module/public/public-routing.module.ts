import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { NotFound404Component } from './not-found404/not-found404.component';

const routes: Routes = [{
  path: 'login',
  component: LoginComponent
},{
  path: 'not-found',
  component: NotFound404Component
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
