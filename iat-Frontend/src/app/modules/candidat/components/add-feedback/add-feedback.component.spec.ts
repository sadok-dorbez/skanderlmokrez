import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeedbackComponent } from './add-feedback.component';

describe('AddFeedbackComponent', () => {
  let component: AddFeedbackComponent;
  let fixture: ComponentFixture<AddFeedbackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFeedbackComponent]
    });
    fixture = TestBed.createComponent(AddFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
