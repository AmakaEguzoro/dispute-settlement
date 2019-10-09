import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { McashTransactionComponent } from './mcash-transaction.component';

describe('TransactionComponent', () => {
  let component: McashTransactionComponent;
  let fixture: ComponentFixture<McashTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ McashTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McashTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
