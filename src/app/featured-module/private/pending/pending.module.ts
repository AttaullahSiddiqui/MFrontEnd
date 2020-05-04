import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PendingComponent } from './pending.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
  path: '',
  component: PendingComponent
}];

@NgModule({
  declarations: [PendingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PendingModule { }
