import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import {ContractComponent} from './contract/contract.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ReportComponent } from './report/report.component';
import { SearchComponent } from './search/search.component';
import { CustomersComponent } from './customers/customers.component';
import { NewContractComponent } from './new-contract/new-contract.component';
import { NewCustomersComponent } from './new-customers/new-customers.component';


const routes: Routes = [
  {
    path: '',
    data: { 'link': '/client' },
    component: ClientComponent,
    children: [
      {
        data: { "link": "/client/contract" },
        path: 'contract',
        component: ContractComponent
      },
      {
        data: { "link": "/client/catalog" },
        path: 'catalog',
        component: CatalogComponent
      },
      {
        data: { "link": "/client/report" },
        path: 'report',
        component: ReportComponent
      },
      {
        data: { "link": "/client/search" },
        path: 'search',
        component: SearchComponent
      },
      {
        data: { "link": "/client/customers" },
        path: 'customers',
        component: CustomersComponent
      },
      {
        data: { "link": "/client/new-contract" },
        path: 'new-contract',
        component: NewContractComponent
      },
      {
        data: { "link": "/client/new-customers" },
        path: 'new-customers',
        component: NewCustomersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
