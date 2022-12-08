import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSampleComponent } from './update-sample.component';

describe('UpdateSampleComponent', () => {
  let component: UpdateSampleComponent;
  let fixture: ComponentFixture<UpdateSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
