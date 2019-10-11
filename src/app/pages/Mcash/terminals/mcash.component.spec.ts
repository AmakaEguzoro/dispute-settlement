import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { McashComponent } from './mcash.component';

describe('McashComponent', () => {
  let component: McashComponent;
  let fixture: ComponentFixture<McashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ McashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
