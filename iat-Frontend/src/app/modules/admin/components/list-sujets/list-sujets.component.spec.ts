import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSujetsComponent } from './list-sujets.component';

describe('ListSujetsComponent', () => {
  let component: ListSujetsComponent;
  let fixture: ComponentFixture<ListSujetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSujetsComponent]
    });
    fixture = TestBed.createComponent(ListSujetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
