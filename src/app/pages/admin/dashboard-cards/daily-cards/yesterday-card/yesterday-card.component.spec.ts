import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YesterdayCardComponent } from './yesterday-card.component';

describe('YesterdayCardComponent', () => {
  let component: YesterdayCardComponent;
  let fixture: ComponentFixture<YesterdayCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YesterdayCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YesterdayCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
