import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewImagesFolderComponent } from './new-images-folder.component';

describe('NewImagesFolderComponent', () => {
  let component: NewImagesFolderComponent;
  let fixture: ComponentFixture<NewImagesFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewImagesFolderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewImagesFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
