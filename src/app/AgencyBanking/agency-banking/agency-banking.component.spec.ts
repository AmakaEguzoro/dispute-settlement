import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyBankingComponent } from './agency-banking.component';

describe('AgencyBankingComponent', () => {
  let component: AgencyBankingComponent;
  let fixture: ComponentFixture<AgencyBankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyBankingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyBankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
