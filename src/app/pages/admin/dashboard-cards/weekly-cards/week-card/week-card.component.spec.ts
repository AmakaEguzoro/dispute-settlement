import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekCardComponent } from './week-card.component';

describe('WeekCardComponent', () => {
  let component: WeekCardComponent;
  let fixture: ComponentFixture<WeekCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
