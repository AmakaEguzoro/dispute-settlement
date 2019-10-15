import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorAnalysisComponent } from './error-analysis.component';

describe('ErrorAnalysisComponent', () => {
  let component: ErrorAnalysisComponent;
  let fixture: ComponentFixture<ErrorAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
