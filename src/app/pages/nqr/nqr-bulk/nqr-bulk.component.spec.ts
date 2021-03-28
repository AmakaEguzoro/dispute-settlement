import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NqrBulkComponent } from './nqr-bulk.component';

describe('NqrBulkComponent', () => {
  let component: NqrBulkComponent;
  let fixture: ComponentFixture<NqrBulkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NqrBulkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NqrBulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
