import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettlementModalComponent } from './settlement-modal.component';

describe('SettlementModalComponent', () => {
  let component: SettlementModalComponent;
  let fixture: ComponentFixture<SettlementModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettlementModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettlementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
