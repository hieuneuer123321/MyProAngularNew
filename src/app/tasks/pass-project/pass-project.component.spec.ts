import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassProjectComponent } from './pass-project.component';

describe('PassProjectComponent', () => {
  let component: PassProjectComponent;
  let fixture: ComponentFixture<PassProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
