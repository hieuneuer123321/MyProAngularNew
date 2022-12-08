import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalRoutingModule } from './personal-routing.module';
import { EventComponent } from './event/event.component';
import { FileCabinetComponent } from './file-cabinet/file-cabinet.component';
import { BusinessCardComponent } from './business-card/business-card.component';
import { ArchwizardModule } from 'angular-archwizard';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxLoadingModule } from 'ngx-loading';
import { UtilitiesModule } from '../utilities/utilities.module';
import { FormsModule } from '@angular/forms';
import { NewEventComponent } from './new-event/new-event.component';
import { CircleProgressOptions, NgCircleProgressModule } from 'ng-circle-progress';
import { NewFileCabinetComponent } from './new-file-cabinet/new-file-cabinet.component';
import { AddBusinessCardComponent } from './add-business-card/add-business-card.component';
import { AddWorkgroupComponent } from './add-workgroup/add-workgroup.component';

@NgModule({
  declarations: [
    EventComponent,
    FileCabinetComponent,
    BusinessCardComponent,
    NewEventComponent,
    NewFileCabinetComponent,
    AddBusinessCardComponent,
    AddWorkgroupComponent






    

  ],
  imports: [
    CommonModule,
    PersonalRoutingModule,
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
export class PersonalModule { }
