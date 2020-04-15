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
  path: 'withdraw',
  loadChildren: () => import('./withdraw/withdraw.module').then(m => m.WithdrawModule)
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
