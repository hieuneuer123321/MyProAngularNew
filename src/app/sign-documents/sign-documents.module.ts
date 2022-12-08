import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignDocumentsRoutingModule } from './sign-documents-routing.module';
import { SignProcessComponent } from './sign-process/sign-process.component';
import { ArchwizardModule } from 'angular-archwizard';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxLoadingModule } from 'ngx-loading';
import { UtilitiesModule } from '../utilities/utilities.module';
import { FormsModule } from '@angular/forms';
import { CircleProgressOptions, NgCircleProgressModule } from 'ng-circle-progress';
import { SignatorListComponent } from './signator-list/signator-list.component';


@NgModule({
  declarations: [
    SignProcessComponent,
    SignatorListComponent
  ],
  imports: [
    CommonModule,
    SignDocumentsRoutingModule,
    ArchwizardModule,
    NgxPaginationModule,
    NgxLoadingModule,
    UtilitiesModule,
    FormsModule,
    NgCircleProgressModule
  ],
  providers:[
    CircleProgressOptions

  ]
})
export class SignDocumentsModule { }
