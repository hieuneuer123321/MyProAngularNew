import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSampleManagerComponent } from './task-sample-manager.component';

describe('TaskSampleManagerComponent', () => {
  let component: TaskSampleManagerComponent;
  let fixture: ComponentFixture<TaskSampleManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskSampleManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskSampleManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
