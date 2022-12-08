import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignatorListComponent } from './signator-list.component';

describe('SignatorListComponent', () => {
  let component: SignatorListComponent;
  let fixture: ComponentFixture<SignatorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignatorListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignatorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
