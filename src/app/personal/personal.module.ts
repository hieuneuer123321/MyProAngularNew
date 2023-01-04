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
import {
  CircleProgressOptions,
  NgCircleProgressModule,
} from 'ng-circle-progress';
import { NewFileCabinetComponent } from './new-file-cabinet/new-file-cabinet.component';
import { AddBusinessCardComponent } from './add-business-card/add-business-card.component';
import { AddWorkgroupComponent } from './add-workgroup/add-workgroup.component';
import { DetailPersonalComponent } from './detail-personal/detail-personal.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ReactiveFormsModule } from '@angular/forms';
import { FileCabinetDetailComponent } from './file-cabinet-detail/file-cabinet-detail.component';
@NgModule({
  declarations: [
    EventComponent,
    FileCabinetComponent,
    BusinessCardComponent,
    NewEventComponent,
    NewFileCabinetComponent,
    AddBusinessCardComponent,
    AddWorkgroupComponent,
    DetailPersonalComponent,
    FileCabinetDetailComponent,
  ],
  imports: [
    CommonModule,
    PersonalRoutingModule,
    ArchwizardModule,
    HttpClientModule,
    AngularEditorModule,
    NgxPaginationModule,
    NgxLoadingModule,
    UtilitiesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class PersonalModule {}
