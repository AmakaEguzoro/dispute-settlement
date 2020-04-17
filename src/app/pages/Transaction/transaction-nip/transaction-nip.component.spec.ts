import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionNipComponent } from './transaction-nip.component';

describe('TransactionnipComponent', () => {
  let component: TransactionNipComponent;
  let fixture: ComponentFixture<TransactionNipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionNipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionNipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
