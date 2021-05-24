import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayDashboardComponent } from './day-dashboard.component';

describe('DayDashboardComponent', () => {
  let component: DayDashboardComponent;
  let fixture: ComponentFixture<DayDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
