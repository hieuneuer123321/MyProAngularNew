import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingTextComponent } from './incoming-text.component';

describe('IncomingTextComponent', () => {
  let component: IncomingTextComponent;
  let fixture: ComponentFixture<IncomingTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomingTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomingTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
