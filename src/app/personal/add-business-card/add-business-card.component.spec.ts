import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBusinessCardComponent } from './add-business-card.component';

describe('AddBusinessCardComponent', () => {
  let component: AddBusinessCardComponent;
  let fixture: ComponentFixture<AddBusinessCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBusinessCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBusinessCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
