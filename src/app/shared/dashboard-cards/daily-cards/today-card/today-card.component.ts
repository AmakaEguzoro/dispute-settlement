import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-today-card',
  templateUrl: './today-card.component.html',
  styleUrls: ['./today-card.component.scss']
})
export class TodayCardComponent implements OnInit {

@Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
