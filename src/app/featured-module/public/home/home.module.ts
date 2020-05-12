import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MiddleComponent } from './middle/middle.component';
import { FooterComponent } from './footer/footer.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
  path: 'header',
  component: HeaderComponent
}];

@NgModule({
  declarations: [HeaderComponent, MiddleComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
