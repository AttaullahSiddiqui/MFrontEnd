import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentSlectionComponent } from './payment-slection.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: PaymentSlectionComponent
}];


@NgModule({
  declarations: [PaymentSlectionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PaymentSlectionModule { }
