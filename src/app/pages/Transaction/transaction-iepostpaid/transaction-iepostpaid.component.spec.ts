import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionIepostpaidComponent } from './transaction-iepostpaid.component';

describe('TransactionIepostpaidComponent', () => {
  let component: TransactionIepostpaidComponent;
  let fixture: ComponentFixture<TransactionIepostpaidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionIepostpaidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionIepostpaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
