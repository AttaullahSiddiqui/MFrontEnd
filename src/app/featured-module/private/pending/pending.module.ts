import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@app/core';
import { PendingComponent } from './pending.component';

const routes: Routes = [{
  path: '',
  component: PendingComponent,
  canActivate: [AuthService]
}];

@NgModule({
  declarations: [PendingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PendingModule { }
