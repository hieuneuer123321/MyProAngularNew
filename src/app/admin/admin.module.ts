import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { UserAdministrationComponent } from './user-administration/user-administration.component';
import { TheGroupUserComponent } from './the-group-user/the-group-user.component';
import { NewGroupUserComponent } from './new-group-user/new-group-user.component';
import { DecentralizationComponent } from './decentralization/decentralization.component';
import { EditUserComponent } from './edit-user/edit-user.component';

@NgModule({
  declarations: [
    UsersComponent,
    UserDetailComponent,
    UserManagerComponent,
    UserAdministrationComponent,
    TheGroupUserComponent,
    NewGroupUserComponent,
    DecentralizationComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxPaginationModule,FormsModule
  ]
})
export class AdminModule { }
