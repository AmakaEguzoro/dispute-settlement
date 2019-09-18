import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionLocksComponent } from './transaction-locks.component';

describe('TransactionLocksComponent', () => {
  let component: TransactionLocksComponent;
  let fixture: ComponentFixture<TransactionLocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionLocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionLocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
