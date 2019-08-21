import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThisMonthPaymentMethodComponent } from './this-month-payment-method.component';

describe('ThisMonthPaymentMethodComponent', () => {
  let component: ThisMonthPaymentMethodComponent;
  let fixture: ComponentFixture<ThisMonthPaymentMethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThisMonthPaymentMethodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThisMonthPaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
