import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PaymentApprovalComponent } from './payment-approval.component';
import { FilterPipe } from './filter.pipe';

const routes: Routes = [{
  path: '',
  component: PaymentApprovalComponent
}];


@NgModule({
  declarations: [PaymentApprovalComponent, FilterPipe],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PaymentApprovalModule { }
