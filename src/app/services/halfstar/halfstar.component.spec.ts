import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HalfstarComponent } from './halfstar.component';

describe('HalfstarComponent', () => {
  let component: HalfstarComponent;
  let fixture: ComponentFixture<HalfstarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HalfstarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HalfstarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
