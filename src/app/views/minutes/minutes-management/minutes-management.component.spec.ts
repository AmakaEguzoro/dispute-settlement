import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinutesManagementComponent } from './minutes-management.component';

describe('MinutesManagementComponent', () => {
  let component: MinutesManagementComponent;
  let fixture: ComponentFixture<MinutesManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinutesManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinutesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
