import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PlansComponent } from './plans.component';

const routes: Routes = [{
  path: 'add',
  component: PlansComponent,
}];


@NgModule({
  declarations: [PlansComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PlansModule { }
