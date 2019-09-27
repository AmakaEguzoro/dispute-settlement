import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-reversal-model',
  templateUrl: './reversal-model.component.html',
  styleUrls: ['./reversal-model.component.scss']
})
export class ReversalModelComponent implements OnInit {
  @Input() data: any;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

}
