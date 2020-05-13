import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from '@app/core';
import { CouponCodesComponent } from './coupon-codes.component';

const routes: Routes = [{
  path: '',
  component: CouponCodesComponent,
  canActivate: [AuthService]
}];



@NgModule({
  declarations: [CouponCodesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CouponCodesModule { }
