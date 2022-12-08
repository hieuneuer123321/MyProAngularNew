import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserhomeComponent } from "./userhome/userhome.component";
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HelpComponent } from './help/help.component';

const routes: Routes = [
  {
    path: '',
    component: UserhomeComponent,
    data: { "link": "/user" },
    children: [
      {
        data: { "link": "/user/info" },
        path:'info',
        component:PersonalInfoComponent
      },
      {
        data: { "link": "/user/change-password" },
        path:'change-password',
        component:ChangePasswordComponent
      },
      {
        data: { "link": "/user/help" },
        path:'help',
        component:HelpComponent
      }
          ]
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UsersRouting { }