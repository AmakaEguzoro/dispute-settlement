import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { TransactionService } from 'app/_service/transaction.service';
import { ToastService } from 'ng-uikit-pro-standard';
import { MDBBootstrapModulesPro } from "ng-uikit-pro-standard";

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {
 @Input() data: any;
   trandata: any;
role:any;
user:any;
username:any;
password:any;
   // Details
   isData: boolean;
   isLoading: boolean;
   loading: boolean;

  constructor(public bsModalRef: BsModalRef, private transactionService: TransactionService, private toastService: ToastService) { }

  ngOnInit() {
   
     this.user= localStorage.getItem('loggedUser');
     this.role = localStorage.getItem('role');
     this.username=localStorage.getItem('loggedUsername');
      console.log(this.role,this.user,this.username,"tim")
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
detailsData:any
  //Nectar#000pp%
  reCreditTransaction() {
    if(!this.password){
      this.toastService.error("Please Input Valid Password")
    }
    else{
    const payload={
reference:this.data.reference,
username:this.username,
password:this.password
    }
    this.isData = true;
    this.loading = true;
    this.transactionService.pendingCreditRequery(payload).subscribe(
      (data) => {
        this.loading = false;
        console.log(data,"data")
          this.toastService.success(data.message || "Successful")  
      },
      (error) => {
        this.isData = false;
          this.loading = false;
          this.toastService.error(error.message)
        console.log("cant requery transaction", error);
      }
    );
  }
  }
}
