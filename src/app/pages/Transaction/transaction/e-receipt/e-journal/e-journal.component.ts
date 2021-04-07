import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-e-journal',
  templateUrl: './e-journal.component.html',
  styleUrls: ['./e-journal.component.scss']
})
export class EJournalComponent implements OnInit {
  @Input() data: any;

  constructor(public bsModal: BsModalRef,) { }

  ngOnInit() {
  }
 

}
