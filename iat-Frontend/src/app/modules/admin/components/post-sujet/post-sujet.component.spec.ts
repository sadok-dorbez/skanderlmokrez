import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSujetComponent } from './post-sujet.component';

describe('PostSujetComponent', () => {
  let component: PostSujetComponent;
  let fixture: ComponentFixture<PostSujetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostSujetComponent]
    });
    fixture = TestBed.createComponent(PostSujetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
