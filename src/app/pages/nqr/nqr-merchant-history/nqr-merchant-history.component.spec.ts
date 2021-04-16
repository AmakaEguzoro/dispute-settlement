import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NqrMerchantHistoryComponent } from './nqr-merchant-history.component';

describe('NqrMerchantHistoryComponent', () => {
  let component: NqrMerchantHistoryComponent;
  let fixture: ComponentFixture<NqrMerchantHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NqrMerchantHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NqrMerchantHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
