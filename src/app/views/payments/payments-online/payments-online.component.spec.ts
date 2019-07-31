import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsOnlineComponent } from './payments-online.component';

describe('PaymentsOnlineComponent', () => {
  let component: PaymentsOnlineComponent;
  let fixture: ComponentFixture<PaymentsOnlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsOnlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
