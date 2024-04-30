import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFeedbackComponent } from './list-feedback.component';

describe('ListFeedbackComponent', () => {
  let component: ListFeedbackComponent;
  let fixture: ComponentFixture<ListFeedbackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListFeedbackComponent]
    });
    fixture = TestBed.createComponent(ListFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
