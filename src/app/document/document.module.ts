import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentComponent } from './document/document.component';
import { CreateFolderComponent } from './create-folder/create-folder.component';
import { IncomingTextComponent } from './incoming-text/incoming-text.component';
import { InternalTextComponent } from './internal-text/internal-text.component';
import { SearchComponent } from './search/search.component';
import { TextGoComponent } from './text-go/text-go.component';
import { TextInheritanceComponent } from './text-inheritance/text-inheritance.component';
import { TextSourceComponent } from './text-source/text-source.component';
import { DocumentRouting } from './document-routing.module';
import { NewDocumentComponent } from './new-document/new-document.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NewTextGoComponent } from './new-text-go/new-text-go.component';
import { UtilitiesModule } from '../utilities/utilities.module';
import { FormsModule } from '@angular/forms';
import { AllTextComponent } from './all-text/all-text.component';
import { DetailDocumentComponent } from './detail-document/detail-document.component';

@NgModule({
  declarations: [
    DocumentComponent,
    CreateFolderComponent,
    IncomingTextComponent,
    InternalTextComponent,
    SearchComponent,
    TextGoComponent,
    TextInheritanceComponent,
    TextSourceComponent,
    NewDocumentComponent,
    NewTextGoComponent,
    AllTextComponent,
    DetailDocumentComponent

  ],
  imports: [
    CommonModule,
    DocumentRouting,
    NgxPaginationModule,FormsModule,
    UtilitiesModule
  ]
})
export class DocumentModule { }
