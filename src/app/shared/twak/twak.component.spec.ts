import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwakComponent } from './twak.component';

describe('TwakComponent', () => {
  let component: TwakComponent;
  let fixture: ComponentFixture<TwakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwakComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
