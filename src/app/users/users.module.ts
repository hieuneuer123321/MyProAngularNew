import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRouting } from './users-routing.module';
import { UserhomeComponent } from './userhome/userhome.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HelpComponent } from './help/help.component';
import { FormsModule } from '@angular/forms';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';


@NgModule({
  declarations: [
    UserhomeComponent,
    PersonalInfoComponent,
    ChangePasswordComponent,
    HelpComponent
  ],
  imports: [
    CommonModule,
    UsersRouting,
    FormsModule,
    AngularMyDatePickerModule
  ]
})
export class UsersModule { }
