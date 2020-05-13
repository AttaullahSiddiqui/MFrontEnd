import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from '@app/core';
import { WithdrawMethodsComponent } from './withdraw-methods.component';

const routes: Routes = [{
  path: '',
  component: WithdrawMethodsComponent,
  canActivate: [AuthService]
}];

@NgModule({
  declarations: [WithdrawMethodsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class WithdrawMethodsModule { }
