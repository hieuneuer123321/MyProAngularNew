import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventRoutingModule } from './event-routing.module';
import { EventComponent } from './event/event.component';
import { EventListComponent } from './event-list/event-list.component';
import { NewEventComponent } from './new-event/new-event.component';
import { ArchwizardModule } from 'angular-archwizard';
import { EventSampleComponent } from './event-sample/event-sample.component';
import { LocationComponent } from './location/location.component';
import { NewEventSampleComponent } from './new-event-sample/new-event-sample.component';
import { EventSampleDetailComponent } from './event-sample-detail/event-sample-detail.component';
import { UpdateSampleComponent } from './update-sample/update-sample.component';
import { EventUpdateComponent } from './event-update/event-update.component';
import { LoadCommentComponent } from './load-comment/load-comment.component';
import { UtilitiesModule } from '../utilities/utilities.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule } from '@angular/forms';
import { CalendarComponent } from '../utilities/calendar/calendar.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    EventComponent,
    EventListComponent,
    NewEventComponent,
    LocationComponent,
    EventSampleComponent,
    NewEventSampleComponent,
    EventSampleDetailComponent,
    UpdateSampleComponent,
    EventUpdateComponent,
    LoadCommentComponent,
  ],
  imports: [
    AngularEditorModule,
    ReactiveFormsModule,
    CommonModule,
    EventRoutingModule,
    ArchwizardModule,
    NgxPaginationModule,
    NgxLoadingModule,
    UtilitiesModule,
    FormsModule,
  ],
})
export class EventModule {}
