import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { UserAdministrationComponent } from './user-administration/user-administration.component';

@NgModule({
  declarations: [
    UsersComponent,
    UserDetailComponent,
    UserManagerComponent,
    UserAdministrationComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxPaginationModule,FormsModule
  ]
})
export class AdminModule { }
