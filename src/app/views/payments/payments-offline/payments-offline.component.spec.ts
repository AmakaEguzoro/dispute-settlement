import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsOfflineComponent } from './payments-offline.component';

describe('PaymentsOfflineComponent', () => {
  let component: PaymentsOfflineComponent;
  let fixture: ComponentFixture<PaymentsOfflineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsOfflineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsOfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
