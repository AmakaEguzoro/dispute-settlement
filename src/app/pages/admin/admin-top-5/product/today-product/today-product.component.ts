import { Component, OnInit, OnDestroy } from '@angular/core';
import * as math from 'mathjs';
import { SubSink } from 'subsink/dist/subsink';
import { ProductsService } from 'app/_service/products.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-today-product',
  templateUrl: './today-product.component.html',
  styleUrls: ['./today-product.component.scss']
})
export class TodayProductComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  loading = false;
  outputProduct: any;
  elements: any;
  isData: boolean;

  constructor(private productsService: ProductsService) { }

  async ngOnInit() {
    await this.getTodayProduct();
  }

  getTodayProduct() {
    this.isData = true;
    this.loading = true, this.productsService.getProducts('day').subscribe(resposeData => {
      this.loading = false;

      // console.log('This is my Response List', resposeData);
      this.outputProduct = resposeData.data.response;
      this.outputProduct = this.outputProduct.sort((a, b) => (a.total > b.total) ? -1 : 1);

      //splice the array and pick the top five
      let sortArray = this.outputProduct;
      this.elements = sortArray.splice(0, 5);
    }, error => {
      this.isData = false;
      this.loading = false;
      console.log('cant get today products response', error);
    });
  }

  ngOnDestroy() {

  }

  headElements = ['', 'Success', 'Fail', 'Total'];
}

