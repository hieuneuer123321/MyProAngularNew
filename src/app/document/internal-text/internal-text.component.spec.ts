import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalTextComponent } from './internal-text.component';

describe('InternalTextComponent', () => {
  let component: InternalTextComponent;
  let fixture: ComponentFixture<InternalTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternalTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
