import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EJournalComponent } from './e-journal.component';

describe('EJournalComponent', () => {
  let component: EJournalComponent;
  let fixture: ComponentFixture<EJournalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EJournalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
