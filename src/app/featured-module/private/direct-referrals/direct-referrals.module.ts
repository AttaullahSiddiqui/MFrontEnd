import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart/chart.component';
import { TableViewComponent } from './table-view/table-view.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [{
  path: 'table-view',
  component: TableViewComponent,
},
{
  path: 'chart',
  component: ChartComponent,
}];

@NgModule({
  declarations: [ChartComponent, TableViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DirectReferralsModule { }
