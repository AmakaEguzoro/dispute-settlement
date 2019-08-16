import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  elements: any = [
    {id: "POS", success: '90.7K', fail: '2K', total: '100,66K'},
    {id: "WEB", success: '300.6K', fail: '40.66K', total: '200.54K'},
    {id: 'ANDROID', success: '100K', fail: '100.66M', total: '110.3K'},
    {id: 'MOBILE', success: '55K', fail: '33K', total: '33.70K'},
    {id: 'POS', success: '90K', fail: '3K', total: '444.66M'},
  ];

  headElements = ['', 'Success', 'Fail', 'Total'];
}
