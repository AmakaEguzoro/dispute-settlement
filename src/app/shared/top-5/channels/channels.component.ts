import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {
  elements: any = [
    {id: 'POS', Success: '90k', Fail: '10k', Total: '100k'},
    {id: 'WEB', Success: '80k', Fail: '10k', Total: '90k'},
    {id: 'MOBILE', Success: '70k', Fail: '10k', Total: '80k'},
    {id: 'ANDROID', Success: '60k', Fail: '10k', Total: '70k'},
    {id: 'POS', Success: '50k', Fail: '10k', Total: '60k'},
  ];

  headElements = ['id','Success', 'Fail', 'Total'];

  constructor() { }

  ngOnInit() {
  }

}
