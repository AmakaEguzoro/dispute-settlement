import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekDashboardComponent } from './week-dashboard.component';

describe('WeekDashboardComponent', () => {
  let component: WeekDashboardComponent;
  let fixture: ComponentFixture<WeekDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
