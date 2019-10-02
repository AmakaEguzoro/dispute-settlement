import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThisWeekPaymentMethodComponent } from './this-week-payment-method.component';

describe('ThisWeekPaymentMethodComponent', () => {
  let component: ThisWeekPaymentMethodComponent;
  let fixture: ComponentFixture<ThisWeekPaymentMethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThisWeekPaymentMethodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThisWeekPaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
