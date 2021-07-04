import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NipPayTransactionsComponent } from './nip-pay-transactions.component';

describe('NipPayTransactionsComponent', () => {
  let component: NipPayTransactionsComponent;
  let fixture: ComponentFixture<NipPayTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NipPayTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NipPayTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
