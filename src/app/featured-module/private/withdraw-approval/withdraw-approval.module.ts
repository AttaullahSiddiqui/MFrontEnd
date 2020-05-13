import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from '@app/core';
import { WithdrawApprovalComponent } from './withdraw-approval.component';

const routes: Routes = [{
  path: '',
  component: WithdrawApprovalComponent,
  canActivate: [AuthService]
}];


@NgModule({
  declarations: [WithdrawApprovalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class WithdrawApprovalModule { }
