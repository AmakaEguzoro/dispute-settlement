import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentdetailComponent } from './agentdetail.component';

describe('AgentdetailComponent', () => {
  let component: AgentdetailComponent;
  let fixture: ComponentFixture<AgentdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
