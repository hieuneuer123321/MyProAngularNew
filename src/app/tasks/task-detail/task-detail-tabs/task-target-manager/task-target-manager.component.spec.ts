import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTargetManagerComponent } from './task-target-manager.component';

describe('TaskTargetManagerComponent', () => {
  let component: TaskTargetManagerComponent;
  let fixture: ComponentFixture<TaskTargetManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskTargetManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskTargetManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
