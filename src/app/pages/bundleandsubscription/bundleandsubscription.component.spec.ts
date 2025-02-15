import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BundleandsubscriptionComponent } from './bundleandsubscription.component';

describe('BundleandsubscriptionComponent', () => {
  let component: BundleandsubscriptionComponent;
  let fixture: ComponentFixture<BundleandsubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BundleandsubscriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BundleandsubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
