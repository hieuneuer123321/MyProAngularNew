import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEventSampleComponent } from './new-event-sample.component';

describe('NewEventSampleComponent', () => {
  let component: NewEventSampleComponent;
  let fixture: ComponentFixture<NewEventSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEventSampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEventSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
