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
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
