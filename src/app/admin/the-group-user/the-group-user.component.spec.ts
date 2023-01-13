import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheGroupUserComponent } from './the-group-user.component';

describe('TheGroupUserComponent', () => {
  let component: TheGroupUserComponent;
  let fixture: ComponentFixture<TheGroupUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheGroupUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TheGroupUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
