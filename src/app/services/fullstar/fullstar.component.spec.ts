import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullstarComponent } from './fullstar.component';

describe('FullstarComponent', () => {
  let component: FullstarComponent;
  let fixture: ComponentFixture<FullstarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullstarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullstarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
