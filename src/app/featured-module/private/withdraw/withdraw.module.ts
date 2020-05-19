import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@app/core';
import { WithdrawComponent } from './withdraw.component';

const routes: Routes = [{
  path: '',
  component: WithdrawComponent,
  canActivate: [AuthService]
}];

@NgModule({
  declarations: [WithdrawComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class WithdrawModule { }