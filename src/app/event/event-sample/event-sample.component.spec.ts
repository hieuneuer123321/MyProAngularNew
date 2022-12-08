import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSampleComponent } from './event-sample.component';

describe('EventSampleComponent', () => {
  let component: EventSampleComponent;
  let fixture: ComponentFixture<EventSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventSampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
