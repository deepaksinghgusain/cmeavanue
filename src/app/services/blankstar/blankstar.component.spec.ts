import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankstarComponent } from './blankstar.component';

describe('BlankstarComponent', () => {
  let component: BlankstarComponent;
  let fixture: ComponentFixture<BlankstarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlankstarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlankstarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
