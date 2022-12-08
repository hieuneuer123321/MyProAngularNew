import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { ContractComponent } from './contract/contract.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ReportComponent } from './report/report.component';
import { SearchComponent } from './search/search.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxLoadingModule } from 'ngx-loading';
import { ArchwizardModule } from 'angular-archwizard';
import { UtilitiesModule } from '../utilities/utilities.module';
import { FormsModule } from '@angular/forms';
import { CustomersComponent } from './customers/customers.component';
import { NewContractComponent } from './new-contract/new-contract.component';
import { NewCustomersComponent } from './new-customers/new-customers.component';


@NgModule({
  declarations: [
    ContractComponent,
    CatalogComponent,
    ReportComponent,
    SearchComponent,
    CustomersComponent,
    NewContractComponent,
    NewCustomersComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    CommonModule,
    ArchwizardModule,
    NgxPaginationModule,
    NgxLoadingModule,
    UtilitiesModule,
    FormsModule
  ]
})
export class ClientModule { }
