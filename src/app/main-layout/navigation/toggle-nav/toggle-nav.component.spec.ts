import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleNavComponent } from './toggle-nav.component';

describe('ToggleNavComponent', () => {
  let component: ToggleNavComponent;
  let fixture: ComponentFixture<ToggleNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToggleNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
