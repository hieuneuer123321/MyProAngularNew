import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGroupUserComponent } from './new-group-user.component';

describe('NewGroupUserComponent', () => {
  let component: NewGroupUserComponent;
  let fixture: ComponentFixture<NewGroupUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewGroupUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGroupUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
