import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionNipSetlComponent } from './transaction-nip-setl.component';

describe('TransactionnipComponent', () => {
  let component: TransactionNipSetlComponent;
  let fixture: ComponentFixture<TransactionNipSetlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionNipSetlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionNipSetlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
