import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CouponCodesComponent } from './coupon-codes.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: CouponCodesComponent
}];



@NgModule({
  declarations: [CouponCodesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CouponCodesModule { }
