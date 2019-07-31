import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinutesDashboardComponent } from './minutes-dashboard.component';

describe('MinutesDashboardComponent', () => {
  let component: MinutesDashboardComponent;
  let fixture: ComponentFixture<MinutesDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinutesDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinutesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
