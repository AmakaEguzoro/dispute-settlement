import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayChannelsComponent } from './today-channels.component';

describe('TodayChannelsComponent', () => {
  let component: TodayChannelsComponent;
  let fixture: ComponentFixture<TodayChannelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodayChannelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
