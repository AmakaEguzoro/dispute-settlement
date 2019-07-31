import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFeedsComponent } from './create-feeds.component';

describe('CreateFeedsComponent', () => {
  let component: CreateFeedsComponent;
  let fixture: ComponentFixture<CreateFeedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFeedsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
