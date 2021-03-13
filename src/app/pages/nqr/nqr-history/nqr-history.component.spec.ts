import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NqrHistoryComponent } from './nqr-history.component';

describe('NqrHistoryComponent', () => {
  let component: NqrHistoryComponent;
  let fixture: ComponentFixture<NqrHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NqrHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NqrHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
