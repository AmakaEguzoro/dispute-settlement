import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedsDashboardComponent } from './feeds-dashboard.component';

describe('FeedsDashboardComponent', () => {
  let component: FeedsDashboardComponent;
  let fixture: ComponentFixture<FeedsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
