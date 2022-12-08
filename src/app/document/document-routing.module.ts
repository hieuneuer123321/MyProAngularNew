import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentComponent } from './document/document.component';
import { CreateFolderComponent } from './create-folder/create-folder.component';
import { IncomingTextComponent } from './incoming-text/incoming-text.component';
import { InternalTextComponent } from './internal-text/internal-text.component';
import { SearchComponent } from './search/search.component';
import { TextGoComponent } from './text-go/text-go.component';
import { TextInheritanceComponent } from './text-inheritance/text-inheritance.component';
import { TextSourceComponent } from './text-source/text-source.component';
import { NewDocumentComponent } from './new-document/new-document.component';
import { NewTextGoComponent } from './new-text-go/new-text-go.component';
import { AllTextComponent } from './all-text/all-text.component';
import { DetailDocumentComponent } from './detail-document/detail-document.component';

const routes: Routes = [
  {
    path: '',
    data: { 'link': '/document' },
    component: DocumentComponent,
    children: [
      {
        data: { "link": "/document/all-text" },
        path: 'all-text',
        component: AllTextComponent
      },
      {
        data: { "link": "/document/incoming-text" },
        path: 'incoming-text',
        component: IncomingTextComponent
      },
      {
        data: { "link": "/document/text-inheritance" },
        path: 'text-inheritance',
        component: TextInheritanceComponent
      },
      {
        data: { "link": "/document/internal-text" },
        path: 'internal-text',
        component: InternalTextComponent
      },
      {
        data: { "link": "/document/create-folder" },
        path: 'create-folder',
        component: CreateFolderComponent
      },
      {
        data: { "link": "/document/search" },
        path: 'search',
        component: SearchComponent
      },
      {
        data: { "link": "/document/text-go" },
        path: 'text-go',
        component: TextGoComponent
      },
      {
        data: { "link": "/document/text-source" },
        path: 'text-source',
        component: TextSourceComponent
      },
      {
        data: { "link": "/document/new-document" },
        path: 'new-document',
        component: NewDocumentComponent
      },
      {
        data: { "link": "/document/new-text-go" },
        path: 'new-text-go',
        component: NewTextGoComponent
      },
      {
        data: { "link": "/document/detail-document" },
        path: 'detail-document',
        component: DetailDocumentComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentRouting {
  
 }