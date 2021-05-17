import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NqrMerchantOnboardComponent } from './nqr-merchant-onboard.component';

describe('NqrMerchantOnboardComponent', () => {
  let component: NqrMerchantOnboardComponent;
  let fixture: ComponentFixture<NqrMerchantOnboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NqrMerchantOnboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NqrMerchantOnboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
