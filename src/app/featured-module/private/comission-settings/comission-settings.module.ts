import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ComissionSettingsComponent } from './comission-settings.component';


const routes: Routes = [{
  path: '',
  component: ComissionSettingsComponent
}];

@NgModule({
  declarations: [ComissionSettingsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ComissionSettingsModule { }
