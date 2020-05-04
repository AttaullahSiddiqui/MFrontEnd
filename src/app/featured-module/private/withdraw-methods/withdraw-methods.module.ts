import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WithdrawMethodsComponent } from './withdraw-methods.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: WithdrawMethodsComponent
}];

@NgModule({
  declarations: [WithdrawMethodsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class WithdrawMethodsModule { }
