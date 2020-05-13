import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from '@app/core';
import { PaymentApprovalComponent } from './payment-approval.component';
import { FilterPipe } from './filter.pipe';

const routes: Routes = [{
  path: '',
  component: PaymentApprovalComponent,
  canActivate: [AuthService]
}];


@NgModule({
  declarations: [PaymentApprovalComponent, FilterPipe],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PaymentApprovalModule { }
