import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialComponent } from './social/social.component';
import { NotificationComponent } from './notification/notification.component';
import { SocialRouting } from './social-routing.module';
import { NewsComponent } from './news/news.component';
import { LibraryComponent } from './library/library.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxLoadingModule } from "ngx-loading";
import { ImagesComponent } from './images/images.component';
import { ContactComponent } from './contact/contact.component';
import { SurveyComponent } from './survey/survey.component';
import { UtilitiesModule } from '../utilities/utilities.module';

import { AngularEditorModule } from '@kolkov/angular-editor';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { NewImageComponent } from './new-image/new-image.component';
import { ArchwizardModule } from 'angular-archwizard';
import { NewImagesFolderComponent } from './new-images-folder/new-images-folder.component';
import { NewsManagerComponent } from './news-manager/news-manager.component';
import { NewsTypeComponent } from './news-type/news-type.component';
@NgModule({
  declarations: [
    SocialComponent,
    NewsComponent,
    LibraryComponent,
    NotificationComponent,
    ImagesComponent,
    ContactComponent,
    SurveyComponent,
    NewsDetailComponent,
    NewImageComponent,
    NewImagesFolderComponent,
    NewsManagerComponent,
    NewsTypeComponent,
  ],
  imports: [
    CommonModule,
    ArchwizardModule,
    SocialRouting,
    NgxPaginationModule,
    NgxLoadingModule.forRoot({}),
    UtilitiesModule,
    AngularEditorModule
  ]
})
export class SocialModule { }
