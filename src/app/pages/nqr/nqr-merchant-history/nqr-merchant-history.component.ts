import {
  Component,
  HostListener,
  OnInit,
  Inject,
  ViewChild,
} from "@angular/core";
import { ToastService } from "ng-uikit-pro-standard";
import { Router } from "@angular/router";
import { MDBBootstrapModulesPro } from "ng-uikit-pro-standard";
import { NqrserviceService } from "../../../_service/nqrservice.service";
import { DOCUMENT } from "@angular/platform-browser";
import { ExcelService } from "app/_service/excel.service";
@Component({
  selector: "app-nqr-merchant-history",
  templateUrl: "./nqr-merchant-history.component.html",
  styleUrls: ["./nqr-merchant-history.component.scss"],
})
export class NqrMerchantHistoryComponent implements OnInit {
  exportData: any;
  merchantData: any;
  merchantName: any;

  constructor(
    private nqrService: NqrserviceService,
    private toast: ToastService,
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private excelService: ExcelService
  ) {}

  serial: number;
  fileArray: any;
  isData: boolean = false;
  perPage: number = 50;
  prev_disable: boolean = true;
  pageRange: string;
  lastPage: number;
  next_disable: boolean = false;
  page = 1;
  summaryData: any;
  total: any;
  currentPage = 1;
  // accountName: "DANIEL ONASOKHARE OGBIMI"
  // accountNumber: "1007040280"
  // code:
  // "00020101021115314434056600520446****M000000816226370018NG.COM.NIBSSPLC.QR0111S00001507005204000053035665802NG5912Tunde
  // Stores6007Nigeria630491F5"
  // contactPerson: "Tunde Ede"
  // created_at: "2021-04-14T21:47:40.202000Z"
  // email: "kenzytech@gmail.com"
  // merchantName: "Tunde Stores"
  // merchantNo: "M0000008162"
  // nipBankNo: "999057"
  // phone: "08105594205"
  // subMerchantName: "Tunde Stores - 09654323"
  // subMerchantNo: "S0000150700"
  // tid: "09654323"
  // tin: "986754323"
  // updated_at: "2021-04-14T21:47:40.202000Z"
  // _id: "607762fca70492505928dd8c"
  headElements = [
    "S/N",
    "Merchant Name(click to view merchant codes)",
    "Merchant No",
    "Account Name",
    "Account No",
    "Contact Person",
    "Email",

    "NIPBankNo",
    "Phone",
    "SubMerchant Name",
    "SubMerchant No",
    "TIN",
    "TID",
    "Created At",
    "QR Code",
  ];
  ngOnInit() {
    this.AgentSummary((this.page = 1));
  }

  loading: boolean = false;

  query: string = "";
  AgentSummary(page, query = "") {
    this.isData = true;
    this.loading = true;
    this.nqrService.getMerchantHistory(this.perPage, page, query).subscribe(
      (data: any) => {
        this.loading = false;

        this.summaryData = data.data.list.data;
        this.lastPage = data.data.list.last_page;

        if (this.page == this.lastPage) {
          this.next_disable = true;
        }

        this.serial = 1 + (this.page - 1) * this.perPage;
      },
      (error) => {
        this.isData = false;
        this.loading = false;
        console.log("cant get agent summary details", error);
      }
    );
  }
  exportTable() {
    this.loading = true;
    this.nqrService.exportMerchantHistory().subscribe(
      (data: any) => {
        this.loading = false;
        this.exportData = data.data.list;

        this.excelService.exportAsExcelFile(
          this.exportData,
          "ITEX-Merchant-Nqr-Report"
        );
      },
      (error) => {
        this.isData = false;
        this.loading = false;
        this.toast.error(
          error.error.message
            ? error.error.message
            : "Can't Download, Please Try Again"
        );
        console.log("cant get agent summary details", error);
      }
    );
  }
  next() {
    this.page += 1;
    if (this.page >= this.lastPage) {
      this.next_disable = true;
    }
    this.prev_disable = false;
    this.AgentSummary(this.page);
  }

  prev() {
    this.page -= 1;
    if (this.page == 1) {
      this.prev_disable = true;
    }
    this.next_disable = false;
    this.AgentSummary(this.page);
  }
  pageChanged(event: any): void {
    // this.loading = true;
    this.page = event.page;
    console.log("current page", this.currentPage);

    this.router.navigateByUrl("/nqr/onboard-history", {
      queryParams: { page: this.page },
    });
  }
  // onWindowScroll() {
  //       if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
  //           this.windowScrolled = true;
  //       }
  //      else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
  //           this.windowScrolled = false;
  //       }
  //   }
  scrollToTop() {
    (function smoothscroll() {
      var currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - currentScroll / 8);
      }
    })();
  }
  href: string;
  qrCode: string = "";
  subMerchantName: string;
  downloadImage() {
    this.href = document.getElementsByTagName("img")[3].src;
  }
  printScreen(modal) {
    modal.hide();
    window.print();
  }
  showModal(row, modal) {
    this.qrCode = row.code;
    this.subMerchantName = row.subMerchantName;
    modal.show();
  }
  showMerchant(merchantName, modal) {
    this.merchantName = merchantName;
    this.loading = true;
    this.nqrService
      .getMerchantHistory(this.perPage, (this.page = 1), merchantName)
      .subscribe(
        (data: any) => {
          this.loading = false;
          console.log(data, "merchantdata");
          this.merchantData = data.data.list.data;
          modal.show();
        },
        (error) => {
          this.isData = false;
          this.loading = false;
          console.log("cant get mmerchant details", error);
        }
      );
  }

  searchNQR() {
    console.log(this.query);
    this.AgentSummary((this.page = 1), this.query);
  }
}
