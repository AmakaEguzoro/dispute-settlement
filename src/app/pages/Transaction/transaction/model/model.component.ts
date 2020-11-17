import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { TransactionService } from 'app/_service/transaction.service';
import { ToastService } from 'ng-uikit-pro-standard';


@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {
 @Input() data: any;
   trandata: any;

   // Details
   isData: boolean;
   isLoading: boolean;

  constructor(public bsModalRef: BsModalRef, private transactionService: TransactionService, private toastService: ToastService) { }

  ngOnInit() {
  }

  requeryInitializedTransaction(reference){
    this.isData = true;
    this.isLoading = true;
    console.log(reference);
    this.transactionService.interfaceWithVasForRequery(reference).subscribe((data) => {
      console.log(data);
      this.trandata = data;
      this.isLoading = false;

      if(this.trandata.status == "success"){
        this.toastService.success("Requery Successful. ");
        window.location.reload();
      } else {
        this.toastService.success("Requery Failed.");
      }

    }, error => {
      this.isData = false;
      this.isLoading = false;
      console.log('cant requery transaction', error);
    });
  }

}
