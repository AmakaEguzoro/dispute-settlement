import { Component, OnInit, OnDestroy } from '@angular/core';
import * as math from 'mathjs';
import { SubSink } from 'subsink/dist/subsink';
import { ProductsService } from 'app/_service/products.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-this-month-product',
  templateUrl: './this-month-product.component.html',
  styleUrls: ['./this-month-product.component.scss']
})
export class ThisMonthProductComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  loading = false;
  outputProduct:any;
  elements: any;
  isData: boolean;

  constructor(private productsService: ProductsService) { }

  async ngOnInit() {
    await this.getThisMonthProduct();

  }

  getThisMonthProduct() {
    this.isData = true;
    this.loading = true,
      this.productsService.getProducts('month').subscribe(resposeData => {
        this.loading = false;
        this.outputProduct = resposeData.data.response;
        this.outputProduct = this.outputProduct.sort((a, b) => (a.total > b.total) ? -1 : 1);

        //splice the array and pick the top five
        let sortArray = this.outputProduct;
        this.elements = sortArray.splice(0, 5);
      }, error => {
        this.isData = false;
        this.loading = false;
        console.log('cant get month products response', error);
      });
  }

  ngOnDestroy() {

  }

  headElements = ['', 'Success', 'Fail', 'Total'];
}


