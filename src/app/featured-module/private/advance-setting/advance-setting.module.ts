import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from '@app/core';
import { ProfileSettingComponent } from './profile-setting/profile-setting.component';
import { PasswordSettingComponent } from './password-setting/password-setting.component';

const routes: Routes = [{
  path: 'add123',
  component: ProfileSettingComponent,
  canActivate: [AuthService]
},
{
  path: 'add321',
  component: PasswordSettingComponent,
  canActivate: [AuthService]
}];

@NgModule({
  declarations: [ProfileSettingComponent, PasswordSettingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdvanceSettingModule { }
