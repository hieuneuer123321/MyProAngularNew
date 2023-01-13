import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { DashboardRouting } from './dashboard-routing.module';
import { UtilitiesModule } from '../utilities/utilities.module';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    DashboardLayoutComponent,

  ],
  imports: [
    CommonModule,
    DashboardRouting,
    UtilitiesModule,
    FormsModule,
    NgxPaginationModule
  ]

})
export class DashboardModule { }
