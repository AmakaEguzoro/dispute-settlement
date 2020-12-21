import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InconclusiveTransactionComponent } from './inconclusive-transaction.component';

describe('InconclusiveTransactionComponent', () => {
  let component: InconclusiveTransactionComponent;
  let fixture: ComponentFixture<InconclusiveTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InconclusiveTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InconclusiveTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
