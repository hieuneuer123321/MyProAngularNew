import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkgroupComponent } from './add-workgroup.component';

describe('AddWorkgroupComponent', () => {
  let component: AddWorkgroupComponent;
  let fixture: ComponentFixture<AddWorkgroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWorkgroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWorkgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
