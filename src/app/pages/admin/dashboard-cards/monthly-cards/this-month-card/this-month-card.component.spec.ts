import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThisMonthCardComponent } from './this-month-card.component';

describe('ThisMonthCardComponent', () => {
  let component: ThisMonthCardComponent;
  let fixture: ComponentFixture<ThisMonthCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThisMonthCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThisMonthCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
