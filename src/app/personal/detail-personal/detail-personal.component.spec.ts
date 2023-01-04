import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPersonalComponent } from './detail-personal.component';

describe('DetailPersonalComponent', () => {
  let component: DetailPersonalComponent;
  let fixture: ComponentFixture<DetailPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailPersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
