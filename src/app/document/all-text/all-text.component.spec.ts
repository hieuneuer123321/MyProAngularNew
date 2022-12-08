import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTextComponent } from './all-text.component';

describe('AllTextComponent', () => {
  let component: AllTextComponent;
  let fixture: ComponentFixture<AllTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
