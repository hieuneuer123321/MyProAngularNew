import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTextGoComponent } from './new-text-go.component';

describe('NewTextGoComponent', () => {
  let component: NewTextGoComponent;
  let fixture: ComponentFixture<NewTextGoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTextGoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTextGoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
