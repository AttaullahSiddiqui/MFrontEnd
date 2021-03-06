import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@app/core';
import { ManualPaymentComponent } from './manual-payment/manual-payment.component';

const routes: Routes = [{
  path: 'manual',
  component: ManualPaymentComponent,
  canActivate: [AuthService]
}];

@NgModule({
  declarations: [ManualPaymentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PaymentModule { }
