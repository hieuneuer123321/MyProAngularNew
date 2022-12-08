import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassGroupComponent } from './pass-group.component';

describe('PassGroupComponent', () => {
  let component: PassGroupComponent;
  let fixture: ComponentFixture<PassGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
