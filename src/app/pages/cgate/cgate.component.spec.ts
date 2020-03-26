import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CgateComponent } from './cgate.component';

describe('CgateComponent', () => {
  let component: CgateComponent;
  let fixture: ComponentFixture<CgateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CgateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CgateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
