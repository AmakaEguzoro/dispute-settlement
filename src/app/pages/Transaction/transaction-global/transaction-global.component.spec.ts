import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionGlobalComponent } from './transaction-global.component';

describe('TransactionGlobalComponent', () => {
  let component: TransactionGlobalComponent;
  let fixture: ComponentFixture<TransactionGlobalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionGlobalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
