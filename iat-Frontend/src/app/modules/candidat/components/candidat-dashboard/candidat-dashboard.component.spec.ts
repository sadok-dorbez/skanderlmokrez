import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatDashboardComponent } from './candidat-dashboard.component';

describe('CandidatDashboardComponent', () => {
  let component: CandidatDashboardComponent;
  let fixture: ComponentFixture<CandidatDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CandidatDashboardComponent]
    });
    fixture = TestBed.createComponent(CandidatDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
