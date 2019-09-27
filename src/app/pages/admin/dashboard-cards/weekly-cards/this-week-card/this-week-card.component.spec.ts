import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThisWeekCardComponent } from './this-week-card.component';

describe('ThisWeekCardComponent', () => {
  let component: ThisWeekCardComponent;
  let fixture: ComponentFixture<ThisWeekCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThisWeekCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThisWeekCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
