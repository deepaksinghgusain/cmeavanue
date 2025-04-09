import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseLisitingComponent } from './course-lisiting.component';

describe('CourseLisitingComponent', () => {
  let component: CourseLisitingComponent;
  let fixture: ComponentFixture<CourseLisitingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseLisitingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseLisitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
