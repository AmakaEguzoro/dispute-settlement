import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThisWeekChannelsComponent } from './this-week-channels.component';

describe('ThisWeekChannelsComponent', () => {
  let component: ThisWeekChannelsComponent;
  let fixture: ComponentFixture<ThisWeekChannelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThisWeekChannelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThisWeekChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
