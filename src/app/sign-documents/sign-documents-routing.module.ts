import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignDocumentsComponent } from './sign-documents.component';
import { SignProcessComponent } from './sign-process/sign-process.component';
import { SignatorListComponent } from './signator-list/signator-list.component';

const routes: Routes = [{
  path: '',
  data: { 'link': '/sign-documents' },
  component: SignDocumentsComponent,
  children: [
    {
      data: { "link": "/sign-documents/sign-process" },
      path: 'sign-process',
      component: SignProcessComponent
    },
    {
      data: { "link": "/sign-documents/signator-list" },
      path: 'signator-list',
      component: SignatorListComponent
    },
    
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignDocumentsRoutingModule { }
