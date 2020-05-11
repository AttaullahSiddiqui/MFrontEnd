import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlansComponent } from './plans.component';

const routes: Routes = [{
  path: '',
  component: PlansComponent,
}];


@NgModule({
  declarations: [PlansComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class PlansModule { }
