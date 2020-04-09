import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VascardComponent } from './vascard.component';

describe('VascardComponent', () => {
  let component: VascardComponent;
  let fixture: ComponentFixture<VascardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VascardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VascardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
