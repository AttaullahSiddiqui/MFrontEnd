import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from '@app/core';
import { DashboardComponent } from './dashboard.component';
import { FilterPipe } from './filter.pipe';

const routes: Routes = [{
  path: '',
  component: DashboardComponent,
  canActivate: [AuthService]
}];

@NgModule({
  declarations: [DashboardComponent, FilterPipe],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
