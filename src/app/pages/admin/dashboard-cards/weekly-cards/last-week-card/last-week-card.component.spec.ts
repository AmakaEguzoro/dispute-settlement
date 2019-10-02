import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastWeekCardComponent } from './last-week-card.component';

describe('LastWeekCardComponent', () => {
  let component: LastWeekCardComponent;
  let fixture: ComponentFixture<LastWeekCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastWeekCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastWeekCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
