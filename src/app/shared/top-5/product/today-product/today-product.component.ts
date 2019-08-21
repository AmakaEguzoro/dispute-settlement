import { Component, OnInit, OnDestroy } from '@angular/core';
import * as math from 'mathjs';
import { SubSink } from 'subsink/dist/subsink';
import { ProductsService } from 'app/service/products.service';

@Component({
  selector: 'app-today-product',
  templateUrl: './today-product.component.html',
  styleUrls: ['./today-product.component.scss']
})
export class TodayProductComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  loading = false;
  totalMTNVTUAmount: any;
  totalMTNPINAmount: any;
  totalMTNDATAAmount: any;
  totalGLOVTUAmount: any;
  totalGLODATAAmount: any;
  totalAIRTELVTUAmount: any;
  totalGLOPINAmount: any;
  totalAIRTELPINAmount: any;
  totalOTHERSAmount: any;
  elements: any;
  isData: boolean;

  constructor(private productsService: ProductsService) { }

  async ngOnInit() {
    // this.test()
    this.isData = true;
    this.loading = true,
      this.subs.add(
        await this.productsService.getTodayProducts().subscribe(responseList => {
          this.loading = false;
          let MTNVTUSuccess = responseList[0];
          let MTNVTUFailed = responseList[1];
          let MTNVTUSuccessAmount = MTNVTUSuccess.data.amount;
          let MTNVTUFailedAmount = MTNVTUFailed.data.amount;
          this.totalMTNVTUAmount = math.add(MTNVTUSuccessAmount, MTNVTUFailedAmount);

          let MTNPINSuccess = responseList[2];
          let MTNPINFailed = responseList[3];
          let MTNPINSuccessAmount = MTNPINSuccess.data.amount;
          let MTNPINFailedAmount = MTNPINFailed.data.amount;
          this.totalMTNPINAmount = math.add(MTNPINSuccessAmount, MTNPINFailedAmount);

          let MTNDATASuccess = responseList[4];
          let MTNDATAFailed = responseList[5];
          let MTNDATASuccessAmount = MTNDATASuccess.data.amount;
          let MTNDATAFailedAmount = MTNDATAFailed.data.amount;
          this.totalMTNDATAAmount = math.add(MTNDATASuccessAmount, MTNDATAFailedAmount);

          let GLOVTUSuccess = responseList[6];
          let GLOVTUFailed = responseList[7];
          let GLOVTUSuccessAmount = GLOVTUSuccess.data.amount;
          let GLOVTUFailedAmount = GLOVTUFailed.data.amount;
          this.totalGLOVTUAmount = math.add(GLOVTUSuccessAmount, GLOVTUFailedAmount);

          let GLOPINSuccess = responseList[8];
          let GLOPINFailed = responseList[9];
          let GLOPINSuccessAmount = GLOPINSuccess.data.amount;
          let GLOPINFailedAmount = GLOPINFailed.data.amount;
          this.totalGLOPINAmount = math.add(GLOPINSuccessAmount, GLOPINFailedAmount);

          let GLODATASuccess = responseList[10];
          let GLODATAFailed = responseList[11];
          let GLODATASuccessAmount = GLODATASuccess.data.amount;
          let GLODATAFailedAmount = GLODATAFailed.data.amount;
          this.totalGLODATAAmount = math.add(GLODATASuccessAmount, GLODATAFailedAmount);

          let AIRTELVTUSuccess = responseList[12];
          let AIRTELVTUFailed = responseList[13];
          let AIRTELVTUSuccessAmount = AIRTELVTUSuccess.data.amount;
          let AIRTELVTUFailedAmount = AIRTELVTUFailed.data.amount;
          this.totalAIRTELVTUAmount = math.add(AIRTELVTUSuccessAmount, AIRTELVTUFailedAmount);

          let AIRTELPINSuccess = responseList[10];
          let AIRTELPINFailed = responseList[11];
          let AIRTELPINSuccessAmount = AIRTELPINSuccess.data.amount;
          let AIRTELPINFailedAmount = AIRTELPINFailed.data.amount;
          this.totalAIRTELPINAmount = math.add(AIRTELPINSuccessAmount, AIRTELPINFailedAmount);

          let OTHERSSuccess = responseList[12];
          let OTHERSFailed = responseList[13];
          let OTHERSSuccessAmount = OTHERSSuccess.data.amount;
          let OTHERSFailedAmount = OTHERSFailed.data.amount;
          this.totalOTHERSAmount = math.add(OTHERSSuccessAmount, OTHERSFailedAmount);

          this.elements =
            [
              { 'title': 'MTN-VTU', 'success': MTNVTUSuccessAmount, 'fail': MTNVTUFailedAmount, 'total': this.totalMTNVTUAmount },
              { 'title': 'OTHERS', 'success': OTHERSSuccessAmount, 'fail': OTHERSFailedAmount, 'total': this.totalOTHERSAmount },
              { 'title': 'MTN-DATA', 'success': MTNDATASuccessAmount, 'fail': MTNDATAFailedAmount, 'total': this.totalMTNDATAAmount },
              { 'title': 'GLO-VTU', 'success': GLOVTUSuccessAmount, 'fail': GLOVTUFailedAmount, 'total': this.totalGLOVTUAmount },
              { 'title': 'AIRTEL-VTU', 'success': AIRTELVTUSuccessAmount, 'fail': AIRTELVTUFailedAmount, 'total': this.totalAIRTELVTUAmount },
              { 'title': 'AIRTEL-PIN', 'success': AIRTELPINSuccessAmount, 'fail': AIRTELPINFailedAmount, 'total': this.totalAIRTELPINAmount },
              { 'title': 'GLO-DATA', 'success': GLODATASuccessAmount, 'fail': GLODATAFailedAmount, 'total': this.totalGLODATAAmount },
              { 'title': 'GLO-PIN', 'success': GLOPINSuccessAmount, 'fail': GLOPINFailedAmount, 'total': this.totalGLOPINAmount },
              { 'title': 'MTN-PIN', 'success': MTNPINSuccessAmount, 'fail': MTNPINFailedAmount, 'total': this.totalMTNPINAmount },
            ];

          this.elements = this.elements.splice(0, 5);
        }, error => {
          this.isData = false;
          this.loading = false;
          console.log('cant get today products response', error);
        }),
      );
  }

  // async test(){
  //   await this.productsService.getProduct().subscribe(responseList => {
  //     console.log(responseList)
  //   },error=>{
  //     console.log('error running the code')
  //   });
  // }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  headElements = ['', 'Success', 'Fail', 'Total'];
}

