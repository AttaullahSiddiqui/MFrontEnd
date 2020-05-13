import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from '@app/core';
import { WithdrawComponent } from './withdraw.component';

const routes: Routes = [{
  path: '',
  component: WithdrawComponent,
  canActivate: [AuthService]
}];

@NgModule({
  declarations: [WithdrawComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class WithdrawModule { }