import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RouteGuardService } from "src/app/services/route-guard.service";
import { DashboardLayoutComponent } from "./dashboard-layout/dashboard-layout.component";


const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    data: { "link": "/dashboard" },
    children: []
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
export class DashboardRouting { }