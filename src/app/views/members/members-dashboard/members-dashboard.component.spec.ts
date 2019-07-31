import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersDashboardComponent } from './members-dashboard.component';

describe('MembersDashboardComponent', () => {
  let component: MembersDashboardComponent;
  let fixture: ComponentFixture<MembersDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembersDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
