import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VascashComponent } from './vascash.component';

describe('VascashComponent', () => {
  let component: VascashComponent;
  let fixture: ComponentFixture<VascashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VascashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VascashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
