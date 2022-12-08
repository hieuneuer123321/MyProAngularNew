import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { TasksRouting } from './task-routing.module';
import { TaskListComponent } from './task-list/task-list.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { TasksComponent } from './tasks/tasks.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ArchwizardModule } from 'angular-archwizard';
import { UtilitiesModule } from '../utilities/utilities.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxLoadingModule } from "ngx-loading";
import { CircleProgressOptions, NgCircleProgressModule } from 'ng-circle-progress';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskReportComponent } from './task-report/task-report.component';
import { DonutChartComponent } from '../utilities/donut-chart/donut-chart.component';
import { ReportComponent } from './report/report.component';
import { ProjectComponent } from './project/project.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectGroupComponent } from './project-group/project-group.component';
import { AddGroupComponent } from './add-group/add-group.component';
import { PassGroupComponent } from './pass-group/pass-group.component';
import { PeriodicalReportComponent } from './periodical-report/periodical-report.component';
import { TaskSettingComponent } from './task-detail/task-detail-tabs/task-setting/task-setting.component';
import { TaskOverviewComponent } from './task-detail/task-detail-tabs/task-overview/task-overview.component';
import { TaskFilesComponent } from './task-detail/task-detail-tabs/task-files/task-files.component';
import { TaskUsersComponent } from './task-detail/task-detail-tabs/task-users/task-users.component';
import { TaskActivityComponent } from './task-detail/task-detail-tabs/task-activity/task-activity.component';
import { TaskTargetsComponent } from './task-detail/task-detail-tabs/task-targets/task-targets.component';
import { DragulaModule } from 'ng2-dragula';
import { TaskTargetDetailComponent } from './task-detail/task-detail-tabs/task-target-detail/task-target-detail.component';
import { TaskTargetManagerComponent } from './task-detail/task-detail-tabs/task-target-manager/task-target-manager.component';
import { TaskSamplesComponent } from './task-samples/task-samples.component';
import { TaskSampleDetailComponent } from './task-sample-detail/task-sample-detail.component';
import { TaskSampleManagerComponent } from './task-sample-manager/task-sample-manager.component';
import { NewReportComponent } from './new-report/new-report.component';
import { ImportReportComponent } from './import-report/import-report.component';
import { TopicComponent } from './topic/topic.component';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';
import { PassProjectComponent } from './pass-project/pass-project.component';

@NgModule({
  declarations: [
    TaskListComponent,
    NewTaskComponent,
    TasksComponent,
    TaskDetailComponent,
    TaskReportComponent,
    DonutChartComponent,
    ReportComponent,
    ProjectComponent,
    ProjectListComponent,
    ProjectGroupComponent,
    AddGroupComponent,
    PassGroupComponent,
    PeriodicalReportComponent,
    TaskSettingComponent,
    TaskOverviewComponent,
    TaskFilesComponent,
    TaskActivityComponent,
    TaskUsersComponent,
    TaskTargetsComponent,
    TaskTargetDetailComponent,
    TaskTargetManagerComponent,
    TaskSamplesComponent,
    TaskSampleDetailComponent,
    TaskSampleManagerComponent,
    NewReportComponent,
    ImportReportComponent,
    TopicComponent,
    TopicDetailComponent,
    PassProjectComponent
  ],
  imports: [
    CommonModule,
    DragulaModule.forRoot(),
    TasksRouting,
    FormsModule,
    AngularMyDatePickerModule,
    AngularEditorModule,
    ArchwizardModule,
    UtilitiesModule,
    NgxPaginationModule,
    NgxLoadingModule.forRoot({}),
    NgCircleProgressModule,
  ],
  providers: [
    CircleProgressOptions
  ]
})
export class TasksModule { }
