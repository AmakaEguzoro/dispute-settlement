import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionLimitsComponent } from './transaction-limits.component';

describe('TransactionLimitsComponent', () => {
  let component: TransactionLimitsComponent;
  let fixture: ComponentFixture<TransactionLimitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionLimitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionLimitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
