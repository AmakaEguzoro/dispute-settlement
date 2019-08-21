import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThisMonthChannelsComponent } from './this-month-channels.component';

describe('ThisMonthChannelsComponent', () => {
  let component: ThisMonthChannelsComponent;
  let fixture: ComponentFixture<ThisMonthChannelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThisMonthChannelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThisMonthChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
