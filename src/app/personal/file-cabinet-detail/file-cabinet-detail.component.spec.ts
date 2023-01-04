import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileCabinetDetailComponent } from './file-cabinet-detail.component';

describe('FileCabinetDetailComponent', () => {
  let component: FileCabinetDetailComponent;
  let fixture: ComponentFixture<FileCabinetDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileCabinetDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileCabinetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
