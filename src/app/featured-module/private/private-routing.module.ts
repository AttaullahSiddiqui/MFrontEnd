import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
  path: 'dashboard',
  loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
},{
  path: 'payment',
  loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule)
},
{
  path: 'direct-referrals',
  loadChildren: () => import('./direct-referrals/direct-referrals.module').then(m => m.DirectReferralsModule)
},{
  path: 'profile',
  loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
},
{
  path: 'company',
  loadChildren: () => import('./company/company.module').then(m => m.CompanyModule)
},
{
  path: 'advance-setting',
  loadChildren: () => import('./advance-setting/advance-setting.module').then(m => m.AdvanceSettingModule)
},
{
  path: 'comission-setting',
  loadChildren: () => import('./comission-settings/comission-settings.module').then(m => m.ComissionSettingsModule)
},
{
  path: 'withdraw',
  loadChildren: () => import('./withdraw/withdraw.module').then(m => m.WithdrawModule)
},
{
  path: 'coupon-codes',
  loadChildren: () => import('./coupon-codes/coupon-codes.module').then(m => m.CouponCodesModule)
},
{
  path: 'withdraw-approval',
  loadChildren: () => import('./withdraw-approval/withdraw-approval.module').then(m => m.WithdrawApprovalModule)
},
{
  path: 'withdrawmethods',
  loadChildren: () => import('./withdraw-methods/withdraw-methods.module').then(m => m.WithdrawMethodsModule)
},
{
  path: 'pending',
  loadChildren: () => import('./pending/pending.module').then(m => m.PendingModule)
},

{
  path: 'paymentapproval',
  loadChildren: () => import('./payment-approval/payment-approval.module').then(m => m.PaymentApprovalModule)
},
{
  path: 'payment-slection',
  loadChildren: () => import('./payment-slection/payment-slection.module').then(m => m.PaymentSlectionModule)
},

{
  path: 'plans',
  loadChildren: () => import('./plans/plans.module').then(m => m.PlansModule)
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
