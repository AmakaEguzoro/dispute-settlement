import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthDashboardComponent } from './month-dashboard.component';

describe('MonthDashboardComponent', () => {
  let component: MonthDashboardComponent;
  let fixture: ComponentFixture<MonthDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
