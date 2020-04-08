import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ManualPaymentComponent } from './manual-payment/manual-payment.component';

const routes: Routes = [{
  path: 'manual',
  component: ManualPaymentComponent
}];

@NgModule({
  declarations: [ManualPaymentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PaymentModule { }
