import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSlectionComponent } from './payment-slection.component';

describe('PaymentSlectionComponent', () => {
  let component: PaymentSlectionComponent;
  let fixture: ComponentFixture<PaymentSlectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentSlectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentSlectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
