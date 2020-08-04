import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastService } from 'ng-uikit-pro-standard';
import { Router } from '@angular/router';
import { TransactionLimit } from 'app/_models/transaction';
import { TransactionService } from 'app/_service/transaction.service';


@Component({
  selector: 'app-transaction-limits',
  templateUrl: './transaction-limits.component.html',
  styleUrls: ['./transaction-limits.component.scss']
})
export class TransactionLimitsComponent implements OnInit {

  searchForm: FormGroup;
  loading: boolean = false;
  isData: boolean;
  transactionLimit: TransactionLimit;

  constructor(public fb: FormBuilder,
    private transactionService: TransactionService,
    private router: Router,
    private toastService: ToastService ) {
    this.searchForm = this.fb.group({
      wallet: ['', Validators.min],
      password: ['', Validators.min]
    });
   }

  ngOnInit() {
  }

  Search() {
    this.loading = true;
    if (this.searchForm.valid) {
      if(this.searchForm.dirty){
        this.transactionLimit = Object.assign({}, this.searchForm.value);
        this.transactionService.getTransactionLimits(this.transactionLimit).subscribe((data) => {
          this.loading = false;        
          console.log(data.message)
          this.toastService.success(data.message); 
        }, error => {
          this.toastService.error(error.message);
          console.log(error.message);
          this.loading = false;
        })
      }
  
    }
  }

// 51047854  Transaction Limit Reset Successfully
// theLiquidMetal%$#  Transaction Limit not Found

}
