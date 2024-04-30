import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadimageComponent } from './uploadimage.component';

describe('UploadimageComponent', () => {
  let component: UploadimageComponent;
  let fixture: ComponentFixture<UploadimageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadimageComponent]
    });
    fixture = TestBed.createComponent(UploadimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
