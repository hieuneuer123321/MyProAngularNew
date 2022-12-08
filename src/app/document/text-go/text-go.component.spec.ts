import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextGoComponent } from './text-go.component';

describe('TextGoComponent', () => {
  let component: TextGoComponent;
  let fixture: ComponentFixture<TextGoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextGoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextGoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
