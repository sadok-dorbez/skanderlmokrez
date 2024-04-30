import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCvComponent } from './upload-cv.component';

describe('UploadCvComponent', () => {
  let component: UploadCvComponent;
  let fixture: ComponentFixture<UploadCvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadCvComponent]
    });
    fixture = TestBed.createComponent(UploadCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
