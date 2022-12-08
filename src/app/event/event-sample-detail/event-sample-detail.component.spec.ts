import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSampleDetailComponent } from './event-sample-detail.component';

describe('EventSampleDetailComponent', () => {
  let component: EventSampleDetailComponent;
  let fixture: ComponentFixture<EventSampleDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventSampleDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSampleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
