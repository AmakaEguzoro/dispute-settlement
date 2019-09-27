import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayPaymentMethodComponent } from './today-payment-method.component';

describe('TodayPaymentMethodComponent', () => {
  let component: TodayPaymentMethodComponent;
  let fixture: ComponentFixture<TodayPaymentMethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodayPaymentMethodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayPaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
