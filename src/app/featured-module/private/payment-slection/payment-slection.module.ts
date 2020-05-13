import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from '@app/core';
import { PaymentSlectionComponent } from './payment-slection.component';

const routes: Routes = [{
  path: '',
  component: PaymentSlectionComponent,
  canActivate: [AuthService]
}];


@NgModule({
  declarations: [PaymentSlectionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PaymentSlectionModule { }
