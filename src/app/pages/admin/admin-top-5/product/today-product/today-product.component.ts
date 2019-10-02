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
  totalMTNVTUAmount: any;
  totalMTNDATAAmount: any;
  totalGLOVTUAmount: any;
  totalGLODATAAmount: any;
  totalAIRTELVTUAmount: any;
  totalAIRTELPINAmount: any;
  totalMultichoiceAmount: any;
  totalIKEDCAmount: any;
  totalEEDCAmount: any;
  totalPHEDAmount: any;
  totalEKEDCAmount: any;
  totalTRANSFERAmount: any;
  totalWITHDRAWALAmount: any;
  totalETISALATVTUAmount: any;
  totalRCN_FUND_TRANSFERAmount: any;
  totalkedcoAmount: any;
  totalSTARTIMESAmount: any;
  totalIBEDCAmount: any;
  totalAEDCAmount: any;
  elements: any;
  isData: boolean;

  constructor(private productsService: ProductsService) { }

  async ngOnInit() {
    await this.getTodayProduct();
  }

  // async test(){
  //   await this.productsService.getProduct().subscribe(responseList => {
  //     console.log(responseList)
  //   },error=>{
  //     console.log('error running the code')
  //   });
  // }
  getTodayProduct() {
    this.isData = true;
    this.loading = true, this.productsService.getTodayProducts().subscribe(responseList => {
          this.loading = false;

          let MTNVTUSuccess = responseList[0];
          let MTNVTUFailed = responseList[1];
          let MTNVTUSuccessAmount = MTNVTUSuccess.data.amount;
          let MTNVTUFailedAmount = MTNVTUFailed.data.amount;
          this.totalMTNVTUAmount = math.add(MTNVTUSuccessAmount, MTNVTUFailedAmount);

          let MTNDATASuccess = responseList[2];
          let MTNDATAFailed = responseList[3];
          let MTNDATASuccessAmount = MTNDATASuccess.data.amount;
          let MTNDATAFailedAmount = MTNDATAFailed.data.amount;
          this.totalMTNDATAAmount = math.add(MTNDATASuccessAmount, MTNDATAFailedAmount);

          let GLOVTUSuccess = responseList[4];
          let GLOVTUFailed = responseList[5];
          let GLOVTUSuccessAmount = GLOVTUSuccess.data.amount;
          let GLOVTUFailedAmount = GLOVTUFailed.data.amount;
          this.totalGLOVTUAmount = math.add(GLOVTUSuccessAmount, GLOVTUFailedAmount);

          let GLODATASuccess = responseList[6];
          let GLODATAFailed = responseList[7];
          let GLODATASuccessAmount = GLODATASuccess.data.amount;
          let GLODATAFailedAmount = GLODATAFailed.data.amount;
          this.totalGLODATAAmount = math.add(GLODATASuccessAmount, GLODATAFailedAmount);

          let AIRTELVTUSuccess = responseList[8];
          let AIRTELVTUFailed = responseList[9];
          let AIRTELVTUSuccessAmount = AIRTELVTUSuccess.data.amount;
          let AIRTELVTUFailedAmount = AIRTELVTUFailed.data.amount;
          this.totalAIRTELVTUAmount = math.add(AIRTELVTUSuccessAmount, AIRTELVTUFailedAmount);

          let AIRTELPINSuccess = responseList[10];
          let AIRTELPINFailed = responseList[11];
          let AIRTELPINSuccessAmount = AIRTELPINSuccess.data.amount;
          let AIRTELPINFailedAmount = AIRTELPINFailed.data.amount;
          this.totalAIRTELPINAmount = math.add(AIRTELPINSuccessAmount, AIRTELPINFailedAmount);

          let WITHDRAWALSuccess = responseList[12];
          let WITHDRAWALFailed = responseList[13];
          let WITHDRAWALSuccessAmount = WITHDRAWALSuccess.data.amount;
          let WITHDRAWALFailedAmount = WITHDRAWALFailed.data.amount;
          this.totalWITHDRAWALAmount = math.add(WITHDRAWALSuccessAmount, WITHDRAWALFailedAmount);

          let ETISALATVTUSuccess = responseList[14];
          let ETISALATVTUFailed = responseList[15];
          let ETISALATVTUSuccessAmount = ETISALATVTUSuccess.data.amount;
          let ETISALATVTUFailedAmount = ETISALATVTUFailed.data.amount;
          this.totalETISALATVTUAmount = math.add(ETISALATVTUSuccessAmount, ETISALATVTUFailedAmount);

          let RCN_FUND_TRANSFERSuccess = responseList[16];
          let RCN_FUND_TRANSFERFailed = responseList[17];
          let RCN_FUND_TRANSFERSuccessAmount = RCN_FUND_TRANSFERSuccess.data.amount;
          let RCN_FUND_TRANSFERFailedAmount = RCN_FUND_TRANSFERFailed.data.amount;
          this.totalRCN_FUND_TRANSFERAmount = math.add(RCN_FUND_TRANSFERSuccessAmount, RCN_FUND_TRANSFERFailedAmount);

          let MultichoiceSuccess = responseList[18];
          let MultichoiceFailed = responseList[19];
          let MultichoiceSuccessAmount = MultichoiceSuccess.data.amount;
          let MultichoiceFailedAmount = MultichoiceFailed.data.amount;
          this.totalMultichoiceAmount = math.add(MultichoiceSuccessAmount, MultichoiceFailedAmount);

          let IKEDCSuccess = responseList[20];
          let IKEDCFailed = responseList[21];
          let IKEDCSuccessAmount = IKEDCSuccess.data.amount;
          let IKEDCFailedAmount = IKEDCFailed.data.amount;
          this.totalIKEDCAmount = math.add(IKEDCSuccessAmount, IKEDCFailedAmount);

          let EEDCSuccess = responseList[22];
          let EEDCFailed = responseList[23];
          let EEDCSuccessAmount = EEDCSuccess.data.amount;
          let EEDCFailedAmount = EEDCFailed.data.amount;
          this.totalEEDCAmount = math.add(EEDCSuccessAmount, EEDCFailedAmount);

          let PHEDSuccess = responseList[24];
          let PHEDFailed = responseList[25];
          let PHEDSuccessAmount = PHEDSuccess.data.amount;
          let PHEDFailedAmount = PHEDFailed.data.amount;
          this.totalPHEDAmount = math.add(PHEDSuccessAmount, PHEDFailedAmount);

          let TRANSFERSuccess = responseList[26];
          let TRANSFERFailed = responseList[27];
          let TRANSFERSuccessAmount = TRANSFERSuccess.data.amount;
          let TRANSFERFailedAmount = TRANSFERFailed.data.amount;
          this.totalTRANSFERAmount = math.add(TRANSFERSuccessAmount, TRANSFERFailedAmount);

          let EKEDCSuccess = responseList[28];
          let EKEDCFailed = responseList[29];
          let EKEDCSuccessAmount = EKEDCSuccess.data.amount;
          let EKEDCFailedAmount = EKEDCFailed.data.amount;
          this.totalEKEDCAmount = math.add(EKEDCSuccessAmount, EKEDCFailedAmount);

          let kedcoSuccess = responseList[30];
          let kedcoFailed = responseList[31];
          let kedcoSuccessAmount = kedcoSuccess.data.amount;
          let kedcoFailedAmount = kedcoFailed.data.amount;
          this.totalkedcoAmount = math.add(kedcoSuccessAmount, kedcoFailedAmount);

          let STARTIMESSuccess = responseList[32];
          let STARTIMESFailed = responseList[33];
          let STARTIMESSuccessAmount = STARTIMESSuccess.data.amount;
          let STARTIMESFailedAmount = STARTIMESFailed.data.amount;
          this.totalSTARTIMESAmount = math.add(STARTIMESSuccessAmount, STARTIMESFailedAmount);

          let IBEDCSuccess = responseList[34];
          let IBEDCFailed = responseList[35];
          let IBEDCSuccessAmount = IBEDCSuccess.data.amount;
          let IBEDCFailedAmount = IBEDCFailed.data.amount;
          this.totalIBEDCAmount = math.add(IBEDCSuccessAmount, IBEDCFailedAmount);

          let AEDCSuccess = responseList[36];
          let AEDCFailed = responseList[37];
          let AEDCSuccessAmount = AEDCSuccess.data.amount;
          let AEDCFailedAmount = AEDCFailed.data.amount;
          this.totalAEDCAmount = math.add(AEDCSuccessAmount, AEDCFailedAmount);

          this.elements =
            [
              { 'title': 'IKEDC', 'success': IKEDCSuccessAmount, 'fail': IKEDCFailedAmount, 'total': this.totalIKEDCAmount },
              { 'title': 'TRANSFER', 'success': TRANSFERSuccessAmount, 'fail': TRANSFERFailedAmount, 'total': this.totalTRANSFERAmount },
              { 'title': 'WITHDRAW', 'success': WITHDRAWALSuccessAmount, 'fail': WITHDRAWALFailedAmount, 'total': this.totalWITHDRAWALAmount },
              { 'title': 'EKEDC', 'success': EKEDCSuccessAmount, 'fail': EKEDCFailedAmount, 'total': this.totalEKEDCAmount },
              { 'title': 'MULTICHOICE', 'success': MultichoiceSuccessAmount, 'fail': MultichoiceFailedAmount, 'total': this.totalMultichoiceAmount },
              { 'title': 'EEDC', 'success': EEDCSuccessAmount, 'fail': EEDCFailedAmount, 'total': this.totalEEDCAmount },
              { 'title': 'PHED', 'success': PHEDSuccessAmount, 'fail': PHEDFailedAmount, 'total': this.totalPHEDAmount },
              { 'title': 'AEDC', 'success': AEDCSuccessAmount, 'fail': AEDCFailedAmount, 'total': this.totalAEDCAmount },
              { 'title': 'MTN-VTU', 'success': MTNVTUSuccessAmount, 'fail': MTNVTUFailedAmount, 'total': this.totalMTNVTUAmount },
              { 'title': 'IBEDC', 'success': IBEDCSuccessAmount, 'fail': IBEDCFailedAmount, 'total': this.totalIBEDCAmount },
              { 'title': 'MTN-DATA', 'success': MTNDATASuccessAmount, 'fail': MTNDATAFailedAmount, 'total': this.totalMTNDATAAmount },
              { 'title': 'GLO-VTU', 'success': GLOVTUSuccessAmount, 'fail': GLOVTUFailedAmount, 'total': this.totalGLOVTUAmount },
              { 'title': 'AIRTEL-VTU', 'success': AIRTELVTUSuccessAmount, 'fail': AIRTELVTUFailedAmount, 'total': this.totalAIRTELVTUAmount },
              { 'title': 'AIRTEL-PIN', 'success': AIRTELPINSuccessAmount, 'fail': AIRTELPINFailedAmount, 'total': this.totalAIRTELPINAmount },
              { 'title': 'GLO-DATA', 'success': GLODATASuccessAmount, 'fail': GLODATAFailedAmount, 'total': this.totalGLODATAAmount },
              { 'title': 'RCN_FUND', 'success': RCN_FUND_TRANSFERSuccessAmount, 'fail': RCN_FUND_TRANSFERFailedAmount, 'total': this.totalRCN_FUND_TRANSFERAmount },
              { 'title': 'ETISALAT-VTU', 'success': ETISALATVTUSuccessAmount, 'fail': ETISALATVTUFailedAmount, 'total': this.totalETISALATVTUAmount },
              { 'title': 'KEDCO', 'success': kedcoSuccessAmount, 'fail': kedcoFailedAmount, 'total': this.totalkedcoAmount },
              { 'title': 'STARTIMES', 'success': STARTIMESSuccessAmount, 'fail': STARTIMESFailedAmount, 'total': this.totalSTARTIMESAmount },
            ];

          this.elements = this.elements.splice(0, 5);
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

