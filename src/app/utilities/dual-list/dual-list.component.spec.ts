import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DualListComponent } from './dual-list.component';

describe('DualListComponent', () => {
  let component: DualListComponent;
  let fixture: ComponentFixture<DualListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DualListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DualListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
