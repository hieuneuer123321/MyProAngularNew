import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskUserManagerComponent } from './task-user-manager.component';

describe('TaskUserManagerComponent', () => {
  let component: TaskUserManagerComponent;
  let fixture: ComponentFixture<TaskUserManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskUserManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskUserManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
