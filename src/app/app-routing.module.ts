import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from '@app/core';

const routes: Routes = [{
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
  path: '',
  component: LayoutComponent,
  children: [{
    path: '',
    loadChildren: () => import('./featured-module/private/private.module').then(m => m.PrivateModule)
  }]
}, {
  path: '',
  loadChildren: () => import('./featured-module/public/public.module').then(m => m.PublicModule)
},{
  path: '**',
  redirectTo: 'not-found'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
