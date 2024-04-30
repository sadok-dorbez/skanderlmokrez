import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SujetDetailsComponent } from './sujet-details.component';

describe('SujetDetailsComponent', () => {
  let component: SujetDetailsComponent;
  let fixture: ComponentFixture<SujetDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SujetDetailsComponent]
    });
    fixture = TestBed.createComponent(SujetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
