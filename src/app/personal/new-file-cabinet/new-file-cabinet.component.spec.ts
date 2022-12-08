import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFileCabinetComponent } from './new-file-cabinet.component';

describe('NewFileCabinetComponent', () => {
  let component: NewFileCabinetComponent;
  let fixture: ComponentFixture<NewFileCabinetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFileCabinetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFileCabinetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
