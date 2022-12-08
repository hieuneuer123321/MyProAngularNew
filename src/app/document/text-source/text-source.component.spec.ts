import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextSourceComponent } from './text-source.component';

describe('TextSourceComponent', () => {
  let component: TextSourceComponent;
  let fixture: ComponentFixture<TextSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextSourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
