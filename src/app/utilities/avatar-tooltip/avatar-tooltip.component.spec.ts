import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarTooltipComponent } from './avatar-tooltip.component';

describe('AvatarTooltipComponent', () => {
  let component: AvatarTooltipComponent;
  let fixture: ComponentFixture<AvatarTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvatarTooltipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
