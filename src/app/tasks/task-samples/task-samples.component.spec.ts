import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSamplesComponent } from './task-samples.component';

describe('TaskSamplesComponent', () => {
  let component: TaskSamplesComponent;
  let fixture: ComponentFixture<TaskSamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskSamplesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskSamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
