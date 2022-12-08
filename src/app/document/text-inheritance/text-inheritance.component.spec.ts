import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextInheritanceComponent } from './text-inheritance.component';

describe('TextInheritanceComponent', () => {
  let component: TextInheritanceComponent;
  let fixture: ComponentFixture<TextInheritanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextInheritanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextInheritanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
