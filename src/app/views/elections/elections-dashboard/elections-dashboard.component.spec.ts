import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionsDashboardComponent } from './elections-dashboard.component';

describe('ElectionsDashboardComponent', () => {
  let component: ElectionsDashboardComponent;
  let fixture: ComponentFixture<ElectionsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectionsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectionsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
