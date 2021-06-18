import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoPostTransactionComponent } from './auto-post-transaction.component';

describe('AutoPostTransactionComponent', () => {
  let component: AutoPostTransactionComponent;
  let fixture: ComponentFixture<AutoPostTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoPostTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoPostTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
