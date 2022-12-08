import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBusinessCardComponent } from './add-business-card/add-business-card.component';
import { BusinessCardComponent } from './business-card/business-card.component';
import { EventComponent } from './event/event.component';
import { FileCabinetComponent } from './file-cabinet/file-cabinet.component';
import { NewEventComponent } from './new-event/new-event.component';
import { NewFileCabinetComponent } from './new-file-cabinet/new-file-cabinet.component';
import { AddWorkgroupComponent } from './add-workgroup/add-workgroup.component';

import { PersonalComponent } from './personal.component';

const routes: Routes = [{
  path: '',
  data: { 'link': '/personal' },
  component: PersonalComponent,
  children: [
    {

      data: { "link": "/personal/event" },
      path: 'event',
      component: EventComponent
    },
    {
      data: { "link": "/personal/file-cabinet" },

      path: 'file-cabinet',
      component: FileCabinetComponent
    },
    {
      data: { "link": "/personal/business-card" },
      path: 'business-card',
      component: BusinessCardComponent
    }, 
    {
      data: { "link": "/personal/new-event" },
      path: 'new-event',
      component: NewEventComponent
    },
    {
      data: { "link": "/personal/new-file-cabinet" },
      path: 'new-file-cabinet',
      component: NewFileCabinetComponent
    },
    {
      data: { "link": "/personal/add-business-card" },
      path: 'add-business-card',
      component: AddBusinessCardComponent
    },{
      data: { "link": "/personal/add-workgroup" },
      path: 'add-workgroup', 
      component: AddBusinessCardComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalRoutingModule { }
