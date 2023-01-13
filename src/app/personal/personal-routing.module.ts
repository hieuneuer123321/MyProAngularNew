import { AddGroupComponent } from './../tasks/add-group/add-group.component';
import { FileCabinetDetailComponent } from './file-cabinet-detail/file-cabinet-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBusinessCardComponent } from './add-business-card/add-business-card.component';
import { BusinessCardComponent } from './business-card/business-card.component';
import { EventComponent } from './event/event.component';
import { FileCabinetComponent } from './file-cabinet/file-cabinet.component';
import { NewEventComponent } from './new-event/new-event.component';
import { NewFileCabinetComponent } from './new-file-cabinet/new-file-cabinet.component';
import { AddWorkgroupComponent } from './add-workgroup/add-workgroup.component';
import { DetailPersonalComponent } from './detail-personal/detail-personal.component';
import { PersonalComponent } from './personal.component';
const routes: Routes = [
  {
    path: '',
    data: { link: '/personal' },
    component: PersonalComponent,
    children: [
      {
        data: { link: '/personal/event' },
        path: 'event',
        component: EventComponent,
      },
      {
        data: { link: '/personal/file-cabinet' },

        path: 'file-cabinet',
        component: FileCabinetComponent,
      },
      {
        data: { link: '/personal/business-card' },
        path: 'business-card',
        component: BusinessCardComponent,
      },
      {
        data: { link: '/personal/new-event' },
        path: 'new-event',
        component: NewEventComponent,
      },
      {
        data: { link: '/personal/new-event/:id' },
        path: 'new-event/:id',
        component: NewEventComponent,
      },
      {
        data: { link: '/personal/update-event/:idLichCaNhan' },
        path: 'update-event/:idLichCaNhan',
        component: NewEventComponent,
      },
      {
        data: { link: '/personal/event/:id' },
        path: 'event/:id',
        component: DetailPersonalComponent,
      },
      {
        data: { link: '/personal/new-file-cabinet' },
        path: 'new-file-cabinet',
        component: NewFileCabinetComponent,
      },
      {
        data: { link: '/personal/add-business-card' },
        path: 'add-business-card',
        component: AddBusinessCardComponent,
      },
      {
        data: { link: '/personal/add-workgroup' },
        path: 'add-workgroup',
        component: AddWorkgroupComponent,
      },
      {
        data: { link: '/personal/file-cabinet/:id' },
        path: 'file-cabinet/:id',
        component: FileCabinetDetailComponent,
      },
      {
        data: { link: '/personal/update-file-cabinet/:id' },
        path: 'update-file-cabinet/:id',
        component: NewFileCabinetComponent,
      },
      {
        data: { link: '/personal/business-card/:id' },
        path: 'business-card/:id',
        component: AddBusinessCardComponent,
      },
      {
        data: { link: '/personal/add-workgroup/:id' },
        path: 'add-workgroup/:id',
        component: AddWorkgroupComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalRoutingModule {}
