import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionsManagementComponent } from './elections-management.component';

describe('ElectionsManagementComponent', () => {
  let component: ElectionsManagementComponent;
  let fixture: ComponentFixture<ElectionsManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectionsManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectionsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
