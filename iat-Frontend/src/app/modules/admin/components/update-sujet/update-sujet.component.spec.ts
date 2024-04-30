import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSujetComponent } from './update-sujet.component';

describe('UpdateSujetComponent', () => {
  let component: UpdateSujetComponent;
  let fixture: ComponentFixture<UpdateSujetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateSujetComponent]
    });
    fixture = TestBed.createComponent(UpdateSujetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
