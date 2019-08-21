import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThisWeekProductComponent } from './this-week-product.component';

describe('ThisWeekProductComponent', () => {
  let component: ThisWeekProductComponent;
  let fixture: ComponentFixture<ThisWeekProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThisWeekProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThisWeekProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
