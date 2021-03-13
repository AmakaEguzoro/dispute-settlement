import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NqrComponent } from './nqr.component';

describe('NqrComponent', () => {
  let component: NqrComponent;
  let fixture: ComponentFixture<NqrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NqrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NqrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
