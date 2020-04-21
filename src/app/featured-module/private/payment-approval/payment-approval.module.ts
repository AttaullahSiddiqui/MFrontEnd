import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PaymentApprovalComponent } from './payment-approval.component';

const routes: Routes = [{
  path: '',
  component: PaymentApprovalComponent
}];


@NgModule({
  declarations: [PaymentApprovalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PaymentApprovalModule { }
