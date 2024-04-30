import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSujetComponent } from './add-sujet.component';

describe('AddSujetComponent', () => {
  let component: AddSujetComponent;
  let fixture: ComponentFixture<AddSujetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSujetComponent]
    });
    fixture = TestBed.createComponent(AddSujetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
