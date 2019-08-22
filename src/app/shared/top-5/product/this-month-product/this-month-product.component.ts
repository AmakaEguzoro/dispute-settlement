import { Component, OnInit, OnDestroy } from '@angular/core';
import * as math from 'mathjs';
import { SubSink } from 'subsink/dist/subsink';
import { ProductsService } from 'app/service/products.service';

@Component({
  selector: 'app-this-month-product',
  templateUrl: './this-month-product.component.html',
  styleUrls: ['./this-month-product.component.scss']
})
export class ThisMonthProductComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
