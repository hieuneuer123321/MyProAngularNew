import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RouteGuardService } from './services/route-guard.service';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    canActivate: [RouteGuardService],
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    canActivate: [RouteGuardService],
    path: 'user',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
  {
    canActivate: [RouteGuardService],
    path: 'tasks',
    loadChildren: () =>
      import('./tasks/task.module').then((m) => m.TasksModule),
  },
  {
    canActivate: [RouteGuardService],
    path: 'social',
    loadChildren: () =>
      import('./social/social.module').then((m) => m.SocialModule),
  },
  {
    canActivate: [RouteGuardService],
    path: 'event',
    loadChildren: () =>
      import('./event/event.module').then((m) => m.EventModule),
  },
  {
    canActivate: [RouteGuardService],
    path: 'personal',
    loadChildren: () =>
      import('./personal/personal.module').then((m) => m.PersonalModule),
  },
  {
    canActivate: [RouteGuardService],
    path: 'document',
    loadChildren: () =>
      import('./document/document.module').then((m) => m.DocumentModule),
  },
  {
    canActivate: [RouteGuardService],
    path: 'client',
    loadChildren: () =>
      import('./client/client.module').then((m) => m.ClientModule),
  },
  {
    canActivate: [RouteGuardService],
    path: 'sign-documents',
    loadChildren: () =>
      import('./sign-documents/sign-documents.module').then(
        (m) => m.SignDocumentsModule
      ),
  },
  {
    canActivate: [RouteGuardService],
    path: 'search',
    loadChildren: () =>
      import('./search/search.module').then((m) => m.SearchModule),
  },
  {
    canActivate: [RouteGuardService],
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];
const config: ExtraOptions = {
  useHash: false,
  initialNavigation: 'disabled',
};
@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
