import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BvnStatusComponent } from './bvn-status.component';

describe('BvnStatusComponent', () => {
  let component: BvnStatusComponent;
  let fixture: ComponentFixture<BvnStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BvnStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BvnStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
