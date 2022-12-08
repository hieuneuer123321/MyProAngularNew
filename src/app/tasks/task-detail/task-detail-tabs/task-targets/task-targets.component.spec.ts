import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTargetsComponent } from './task-targets.component';

describe('TaskTargetsComponent', () => {
  let component: TaskTargetsComponent;
  let fixture: ComponentFixture<TaskTargetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskTargetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskTargetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
