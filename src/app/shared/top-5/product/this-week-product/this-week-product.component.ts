import { Component, OnInit, OnDestroy } from '@angular/core';
import * as math from 'mathjs';
import { SubSink } from 'subsink/dist/subsink';
import { ProductsService } from 'app/service/products.service';

@Component({
  selector: 'app-this-week-product',
  templateUrl: './this-week-product.component.html',
  styleUrls: ['./this-week-product.component.scss']
})
export class ThisWeekProductComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
