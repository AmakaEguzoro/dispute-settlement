import { Component, OnInit, Input } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { TransactionService } from "app/_service/transaction.service";
import { ToastService } from "ng-uikit-pro-standard";
import { MDBBootstrapModulesPro } from "ng-uikit-pro-standard";

@Component({
  selector: "app-settlement-modal",
  templateUrl: "./settlement-modal.component.html",
  styleUrls: ["./settlement-modal.component.scss"],
})
export class SettlementModalComponent implements OnInit {
  @Input() data: any;
  trandata: any;

  // Details
  isData: boolean;
  isLoading: boolean;

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {}

  sendToSanef() {
    // this.sanefService.saveDispute(this.disputeStatus).subscribe(
    //   (data) => {
    //     this.getDispute();
    //     return true;
    //   },
    //   (error) => {
    //     console.error("Failed");
    //   }
    // );
  }
}
