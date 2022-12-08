import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSettingComponent } from './task-setting.component';

describe('TaskSettingComponent', () => {
  let component: TaskSettingComponent;
  let fixture: ComponentFixture<TaskSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
