import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastYearCardComponent } from './last-year-card.component';

describe('LastYearCardComponent', () => {
  let component: LastYearCardComponent;
  let fixture: ComponentFixture<LastYearCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastYearCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastYearCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
