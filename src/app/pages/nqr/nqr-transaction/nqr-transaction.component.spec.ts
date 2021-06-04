import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NqrTransactionComponent } from './nqr-transaction.component';

describe('NqrTransactionComponent', () => {
  let component: NqrTransactionComponent;
  let fixture: ComponentFixture<NqrTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NqrTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NqrTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
