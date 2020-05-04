import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileSettingComponent } from './profile-setting/profile-setting.component';
import { PasswordSettingComponent } from './password-setting/password-setting.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: 'add123',
  component: ProfileSettingComponent,
},
{
  path: 'add321',
  component: PasswordSettingComponent,
}];

@NgModule({
  declarations: [ProfileSettingComponent, PasswordSettingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdvanceSettingModule { }
