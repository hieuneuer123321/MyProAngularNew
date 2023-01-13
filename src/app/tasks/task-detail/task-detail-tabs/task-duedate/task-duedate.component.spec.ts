import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDuedateComponent } from './task-duedate.component';

describe('TaskDuedateComponent', () => {
  let component: TaskDuedateComponent;
  let fixture: ComponentFixture<TaskDuedateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskDuedateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDuedateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
