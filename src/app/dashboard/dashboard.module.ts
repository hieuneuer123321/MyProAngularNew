import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { DashboardRouting } from './dashboard-routing.module';
import { UtilitiesModule } from '../utilities/utilities.module';


@NgModule({
  declarations: [
    DashboardLayoutComponent,

  ],
  imports: [
    CommonModule,
    DashboardRouting,
    UtilitiesModule
  ]

})
export class DashboardModule { }
