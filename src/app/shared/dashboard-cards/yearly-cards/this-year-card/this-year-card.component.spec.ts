import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThisYearCardComponent } from './this-year-card.component';

describe('ThisYearCardComponent', () => {
  let component: ThisYearCardComponent;
  let fixture: ComponentFixture<ThisYearCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThisYearCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThisYearCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
