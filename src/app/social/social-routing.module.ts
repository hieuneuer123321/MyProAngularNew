import { SocialComponent } from '../social/social/social.component';
import { RouterModule, Routes } from "@angular/router";
import { NotificationComponent } from '../social/notification/notification.component';
import { NewsComponent } from './news/news.component';
import { LibraryComponent } from './library/library.component';
import { ImagesComponent } from './images/images.component';
import { ContactComponent } from './contact/contact.component';
import { SurveyComponent } from './survey/survey.component';
import { NewImageComponent } from './new-image/new-image.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

const routes: Routes = [
    {
        path: '',
        component: SocialComponent,
        data: { 'link': '/social' },
        children: [
            {
                data: { "link": "/notification" },
                path: 'notification',
                component: NotificationComponent
            },
            {
                data: { "link": "/social/news" },
                path: 'news',
                component: NewsComponent
            },
            {
                data: { "link": "/social/library" },
                path: 'library',
                component: LibraryComponent
            },
            {
                data: { "link": "/social/images" },
                path: 'images',
                component: ImagesComponent
            },
            {
                data: { "link": "/social/contact" },
                path: 'contact',
                component: ContactComponent
            },
            {
                data: { "link": "/social/survey" },
                path: 'survey',
                component: SurveyComponent
            },
            {
                data: { "link": "/social/images/new" },
                path: 'images/new',
                component: NewImageComponent
            },
            {
                data: { "link": "/social/news/detail" },
                path: 'news/detail/:id',
                component: NewsDetailComponent
            },
        ]
    }
];
@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class SocialRouting { }