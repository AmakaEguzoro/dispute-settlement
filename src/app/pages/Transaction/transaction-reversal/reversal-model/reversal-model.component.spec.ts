import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReversalModelComponent } from './reversal-model.component';

describe('ReversalModelComponent', () => {
  let component: ReversalModelComponent;
  let fixture: ComponentFixture<ReversalModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReversalModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReversalModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
