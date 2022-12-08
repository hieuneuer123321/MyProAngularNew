import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSampleDetailComponent } from './task-sample-detail.component';

describe('TaskSampleDetailComponent', () => {
  let component: TaskSampleDetailComponent;
  let fixture: ComponentFixture<TaskSampleDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskSampleDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskSampleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
