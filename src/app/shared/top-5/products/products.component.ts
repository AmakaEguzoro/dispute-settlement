import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  elements: any = [
    {id: 1, first: 'Mark', last: 'Otto', handle: '@mdo'},
    {id: 2, first: 'Jacob', last: 'Thornton', handle: '@fat'},
    {id: 3, first: 'Larry', last: 'the Bird', handle: '@twitter'},
    {id: 4, first: 'Jacob', last: 'Thornton', handle: '@fat'},
    {id: 5, first: 'Larry', last: 'the Bird', handle: '@twitter'},
  ];

  headElements = ['', 'Success', 'Fail', 'Total'];
}
