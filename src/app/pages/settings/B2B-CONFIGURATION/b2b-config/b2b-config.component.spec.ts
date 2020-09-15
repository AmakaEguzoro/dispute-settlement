import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bConfigComponent } from './b2b-config.component';

describe('B2bConfigComponent', () => {
  let component: B2bConfigComponent;
  let fixture: ComponentFixture<B2bConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B2bConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2bConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
