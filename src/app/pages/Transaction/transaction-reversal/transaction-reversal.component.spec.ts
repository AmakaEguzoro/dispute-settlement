import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionReversalComponent } from './transaction-reversal.component';

describe('TransactionReversalComponent', () => {
  let component: TransactionReversalComponent;
  let fixture: ComponentFixture<TransactionReversalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionReversalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionReversalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
