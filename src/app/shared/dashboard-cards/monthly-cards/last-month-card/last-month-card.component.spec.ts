import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastMonthCardComponent } from './last-month-card.component';

describe('LastMonthCardComponent', () => {
  let component: LastMonthCardComponent;
  let fixture: ComponentFixture<LastMonthCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastMonthCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastMonthCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
