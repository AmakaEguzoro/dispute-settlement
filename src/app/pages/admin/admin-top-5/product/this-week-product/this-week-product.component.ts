import { Component, OnInit, OnDestroy } from '@angular/core';
import * as math from 'mathjs';
import { SubSink } from 'subsink/dist/subsink';
import { ProductsService } from 'app/_service/products.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-this-week-product',
  templateUrl: './this-week-product.component.html',
  styleUrls: ['./this-week-product.component.scss']
})
export class ThisWeekProductComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  loading = false;
  outputProduct: any;
  elements: any;
  isData: boolean;

  constructor(private productsService: ProductsService) { }

  async ngOnInit() {
    await this.getThisWeekProduct();

  }

  getThisWeekProduct() {
    this.isData = true;
    this.loading = true,
      this.productsService.getProducts('week').subscribe(resposeData => {
        this.loading = false;
        this.outputProduct = resposeData.data.response;
        this.outputProduct = this.outputProduct.sort((a, b) => (a.total > b.total) ? -1 : 1);

        //splice the array and pick the top five
        let sortArray = this.outputProduct;
        this.elements = sortArray.splice(0, 5);
       
      }, error => {
        this.isData = false;
        this.loading = false;
        console.log('cant get week products response', error);
      });
  }

  ngOnDestroy() {

  }

  headElements = ['', 'Success', 'Fail', 'Total'];
}

