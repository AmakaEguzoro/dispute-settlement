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

  totalMultichoiceAmount: any;
  totalIKEDCAmount: any;
  totalEEDCAmount: any;
  totalPHEDCAmount: any;
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

          // 
          let WITHDRAWALSuccess = responseList[14];
          let WITHDRAWALFailed = responseList[15];
          let WITHDRAWALSuccessAmount = WITHDRAWALSuccess.data.amount;
          let WITHDRAWALFailedAmount = WITHDRAWALFailed.data.amount;
          this.totalWITHDRAWALAmount = math.add(WITHDRAWALSuccessAmount, WITHDRAWALFailedAmount);

          let ETISALATVTUSuccess = responseList[16];
          let ETISALATVTUFailed = responseList[17];
          let ETISALATVTUSuccessAmount = ETISALATVTUSuccess.data.amount;
          let ETISALATVTUFailedAmount = ETISALATVTUFailed.data.amount;
          this.totalETISALATVTUAmount = math.add(ETISALATVTUSuccessAmount, ETISALATVTUFailedAmount);

          let RCN_FUND_TRANSFERSuccess = responseList[18];
          let RCN_FUND_TRANSFERFailed = responseList[19];
          let RCN_FUND_TRANSFERSuccessAmount = RCN_FUND_TRANSFERSuccess.data.amount;
          let RCN_FUND_TRANSFERFailedAmount = RCN_FUND_TRANSFERFailed.data.amount;
          this.totalRCN_FUND_TRANSFERAmount = math.add(RCN_FUND_TRANSFERSuccessAmount, RCN_FUND_TRANSFERFailedAmount);

          let MultichoiceSuccess = responseList[20];
          let MultichoiceFailed = responseList[21];
          let MultichoiceSuccessAmount = MultichoiceSuccess.data.amount;
          let MultichoiceFailedAmount = MultichoiceFailed.data.amount;
          this.totalMultichoiceAmount = math.add(MultichoiceSuccessAmount, MultichoiceFailedAmount);

          let IKEDCSuccess = responseList[22];
          let IKEDCFailed = responseList[23];
          let IKEDCSuccessAmount = IKEDCSuccess.data.amount;
          let IKEDCFailedAmount = IKEDCFailed.data.amount;
          this.totalIKEDCAmount = math.add(IKEDCSuccessAmount, IKEDCFailedAmount);

          let EEDCSuccess = responseList[24];
          let EEDCFailed = responseList[25];
          let EEDCSuccessAmount = EEDCSuccess.data.amount;
          let EEDCFailedAmount = EEDCFailed.data.amount;
          this.totalEEDCAmount = math.add(EEDCSuccessAmount, EEDCFailedAmount);

          let PHEDCSuccess = responseList[26];
          let PHEDCFailed = responseList[27];
          let PHEDCSuccessAmount = PHEDCSuccess.data.amount;
          let PHEDCFailedAmount = PHEDCFailed.data.amount;
          this.totalPHEDCAmount = math.add(PHEDCSuccessAmount, PHEDCFailedAmount);

          let TRANSFERSuccess = responseList[28];
          let TRANSFERFailed = responseList[29];
          let TRANSFERSuccessAmount = TRANSFERSuccess.data.amount;
          let TRANSFERFailedAmount = TRANSFERFailed.data.amount;
          this.totalTRANSFERAmount = math.add(TRANSFERSuccessAmount, TRANSFERFailedAmount);

          let EKEDCSuccess = responseList[30];
          let EKEDCFailed = responseList[31];
          let EKEDCSuccessAmount = EKEDCSuccess.data.amount;
          let EKEDCFailedAmount = EKEDCFailed.data.amount;
          this.totalEKEDCAmount = math.add(EKEDCSuccessAmount, EKEDCFailedAmount);

          let kedcoSuccess = responseList[32];
          let kedcoFailed = responseList[33];
          let kedcoSuccessAmount = kedcoSuccess.data.amount;
          let kedcoFailedAmount = kedcoFailed.data.amount;
          this.totalkedcoAmount = math.add(kedcoSuccessAmount, kedcoFailedAmount);

          let STARTIMESSuccess = responseList[34];
          let STARTIMESFailed = responseList[35];
          let STARTIMESSuccessAmount = STARTIMESSuccess.data.amount;
          let STARTIMESFailedAmount = STARTIMESFailed.data.amount;
          this.totalSTARTIMESAmount = math.add(STARTIMESSuccessAmount, STARTIMESFailedAmount);

          let IBEDCSuccess = responseList[36];
          let IBEDCFailed = responseList[37];
          let IBEDCSuccessAmount = IBEDCSuccess.data.amount;
          let IBEDCFailedAmount = IBEDCFailed.data.amount;
          this.totalIBEDCAmount = math.add(IBEDCSuccessAmount, IBEDCFailedAmount);

          let AEDCSuccess = responseList[38];
          let AEDCFailed = responseList[39];
          let AEDCSuccessAmount = AEDCSuccess.data.amount;
          let AEDCFailedAmount = AEDCFailed.data.amount;
          this.totalAEDCAmount = math.add(AEDCSuccessAmount, AEDCFailedAmount);

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

              { 'title': 'WITHDRAWAL', 'success': WITHDRAWALSuccessAmount, 'fail': WITHDRAWALFailedAmount, 'total': this.totalWITHDRAWALAmount },
              { 'title': 'RCN_FUND_TRANSFER', 'success': RCN_FUND_TRANSFERSuccessAmount, 'fail': RCN_FUND_TRANSFERFailedAmount, 'total': this.totalRCN_FUND_TRANSFERAmount },
              { 'title': 'ETISALAT-VTU', 'success': ETISALATVTUSuccessAmount, 'fail': ETISALATVTUFailedAmount, 'total': this.totalETISALATVTUAmount },
              { 'title': 'MULTICHOICE', 'success': MultichoiceSuccessAmount, 'fail': MultichoiceFailedAmount, 'total': this.totalMultichoiceAmount },
              { 'title': 'IKEDC', 'success': IKEDCSuccessAmount, 'fail': IKEDCFailedAmount, 'total': this.totalIKEDCAmount },
              { 'title': 'EEDC', 'success': EEDCSuccessAmount, 'fail': EEDCFailedAmount, 'total': this.totalEEDCAmount },
              { 'title': 'PHEDC', 'success': PHEDCSuccessAmount, 'fail': PHEDCFailedAmount, 'total': this.totalPHEDCAmount },
              { 'title': 'EKEDC', 'success': EKEDCSuccessAmount, 'fail': EKEDCFailedAmount, 'total': this.totalEKEDCAmount },
              { 'title': 'TRANSFER', 'success': TRANSFERSuccessAmount, 'fail': TRANSFERFailedAmount, 'total': this.totalTRANSFERAmount },
              { 'title': 'KEDCO', 'success': kedcoSuccessAmount, 'fail': kedcoFailedAmount, 'total': this.totalkedcoAmount },
              { 'title': 'STARTIMES', 'success': STARTIMESSuccessAmount, 'fail': STARTIMESFailedAmount, 'total': this.totalSTARTIMESAmount },
              { 'title': 'IBEDC', 'success': IBEDCSuccessAmount, 'fail': IBEDCFailedAmount, 'total': this.totalIBEDCAmount },
              { 'title': 'AEDC', 'success': AEDCSuccessAmount, 'fail': AEDCFailedAmount, 'total': this.totalAEDCAmount },
            ];

          // this.elements = this.elements.splice(0, 5);
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

