import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThisMonthProductComponent } from './this-month-product.component';

describe('ThisMonthProductComponent', () => {
  let component: ThisMonthProductComponent;
  let fixture: ComponentFixture<ThisMonthProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThisMonthProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThisMonthProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
