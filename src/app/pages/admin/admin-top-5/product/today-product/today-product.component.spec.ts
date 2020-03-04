import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayProductComponent } from './today-product.component';

describe('TodayProductComponent', () => {
  let component: TodayProductComponent;
  let fixture: ComponentFixture<TodayProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodayProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
