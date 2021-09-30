import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-purchase-receipt1',
  templateUrl: './purchase-receipt.component.html',
  styleUrls: ['./purchase-receipt.component.scss']
})
export class PurchaseReceiptComponent1 implements OnInit {
  @Input() receiptData;

  constructor(public bsModalRef: BsModalRef,) { }

  ngOnInit() {
  }
  printTicket (event) {
    var printContents = document.getElementById('hello');
  
    const element = document.createElement('div');
    element.style.display = 'none';

   element.insertBefore(printContents,element.nextSibling) ;

 document.body.append(element);

    const loader = document.createElement('i');
    loader.classList.add('fa', 'fa-spinner', 'fa-spin');
    event.target.append(loader);
    
    setTimeout(()=> {
      this.bsModalRef.hide()

      document.getElementById('root').style.display = 'none';
      document.getElementById('grip').style.display = 'none';
      document.getElementById('modalReceipt').style.display = 'none';
      document.getElementById('model-show').style.display = 'none';
      
      document.querySelector('.modal-backdrop').setAttribute('style', 'display: none')
      element.style.display = 'block';
      window.focus();
      window.print();
      document.getElementById('root').style.display = 'flex';
      document.querySelector('.modal-backdrop').setAttribute('style', 'display: block')
  
      element.remove();
      loader.remove();
    },1500)

}
}
