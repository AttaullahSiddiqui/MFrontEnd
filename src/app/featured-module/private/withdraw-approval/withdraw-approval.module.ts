import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WithdrawApprovalComponent } from './withdraw-approval.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: WithdrawApprovalComponent
}];


@NgModule({
  declarations: [WithdrawApprovalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class WithdrawApprovalModule { }
