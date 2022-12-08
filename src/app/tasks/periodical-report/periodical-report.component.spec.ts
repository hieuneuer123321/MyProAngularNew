import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodicalReportComponent } from './periodical-report.component';

describe('PeriodicalReportComponent', () => {
  let component: PeriodicalReportComponent;
  let fixture: ComponentFixture<PeriodicalReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeriodicalReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodicalReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
