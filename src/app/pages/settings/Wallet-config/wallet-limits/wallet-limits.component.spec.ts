import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletLimitsComponent } from './wallet-limits.component';

describe('WalletLimitsComponent', () => {
  let component: WalletLimitsComponent;
  let fixture: ComponentFixture<WalletLimitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletLimitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletLimitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
