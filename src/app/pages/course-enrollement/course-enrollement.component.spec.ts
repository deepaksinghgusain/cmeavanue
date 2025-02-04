import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEnrollementComponent } from './course-enrollement.component';

describe('CourseEnrollementComponent', () => {
  let component: CourseEnrollementComponent;
  let fixture: ComponentFixture<CourseEnrollementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseEnrollementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseEnrollementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
