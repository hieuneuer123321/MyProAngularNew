import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTargetDetailComponent } from './task-target-detail.component';

describe('TaskTargetDetailComponent', () => {
  let component: TaskTargetDetailComponent;
  let fixture: ComponentFixture<TaskTargetDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskTargetDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskTargetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
