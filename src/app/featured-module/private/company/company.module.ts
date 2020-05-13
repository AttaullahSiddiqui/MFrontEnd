import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from '@app/core';
import { CompanyComponent } from './company.component';


const routes: Routes = [{
  path: '',
  component: CompanyComponent,
  canActivate: [AuthService]
}];

@NgModule({
  declarations: [CompanyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CompanyModule { }
