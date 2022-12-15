import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './event-list/event-list.component';
import { EventComponent } from './event/event.component';
import { NewEventComponent } from './new-event/new-event.component';
import { EventSampleComponent } from './event-sample/event-sample.component';
import { LocationComponent } from './location/location.component';
import { NewEventSampleComponent } from './new-event-sample/new-event-sample.component';
import { UpdateSampleComponent } from './update-sample/update-sample.component';
import { EventSampleDetailComponent } from './event-sample-detail/event-sample-detail.component';
import { EventUpdateComponent } from './event-update/event-update.component';
import { LoadCommentComponent } from './load-comment/load-comment.component';
const routes: Routes = [
  {
    path: '',
    data: { link: '/event' },
    component: EventComponent,
    children: [
      {
        data: { link: '/event/event-list' },
        path: 'event-list',
        component: EventListComponent,
      },
      {
        data: { link: '/event/new-event' },
        path: 'new-event',
        component: NewEventComponent,
      },
      {
        data: { link: '/event/event-sample' },
        path: 'event-sample',
        component: EventSampleComponent,
      },
      {
        data: { link: '/event/location' },
        path: 'location',
        component: LocationComponent,
      },
      {
        data: { link: '/event/new-event-sample' },
        path: 'new-event-sample',
        component: NewEventSampleComponent,
      },
      {
        data: { link: '/event/new-event-sample/detail/:id' },
        path: 'new-event-sample/detail/:id',
        component: EventSampleDetailComponent,
      },
      {
        data: { link: '/event/update-event-sample/:id' },
        path: 'update-event-sample/:id',
        component: UpdateSampleComponent,
      },
      {
        data: { link: '/event/event-list/update-event/:id' },
        path: 'event-list/update-event/:id',
        component: EventUpdateComponent,
      },
      {
        data: { link: '/event/event-list/LoadComment-event/:id' },
        path: 'event-list/LoadComment-event/:id',
        component: LoadCommentComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventRoutingModule {}
