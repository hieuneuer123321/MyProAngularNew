import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadCommentComponent } from './load-comment.component';

describe('LoadCommentComponent', () => {
  let component: LoadCommentComponent;
  let fixture: ComponentFixture<LoadCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
