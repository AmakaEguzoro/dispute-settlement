import { Component, OnInit , ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef  , Input} from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent, MdbTableService } from 'ng-uikit-pro-standard';
@Component({
  selector: 'app-role-manager',
  templateUrl: './role-manager.component.html',
  styleUrls: ['./role-manager.component.scss']
})
export class RoleManagerComponent implements OnInit , AfterViewInit{
 
  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent) mdbPagination: MdbTablePaginationComponent;
  @ViewChild('row') row: ElementRef;

  elements: any = [];headElements = ['ID', 'First', 'Last', 'Handle'];

  searchText: string = ''; previous: string;

  firstItemIndex;lastItemIndex;
///////////Add Admin table data
 @Input() shadows = true;

 tableData: object[] = [
  { first: 'Mark', last: 'Otto', username: '@mdo', email: 'markotto@gmail.com', country: 'USA', city: 'San Francisco' },
  { first: 'Jacob', last: 'Thornton', username: '@fat', email: 'jacobt@gmail.com', country: 'France', city: 'Paris' },
  { first: 'Larry', last: 'the Bird', username: '@twitter', email: 'larrybird@gmail.com', country: 'Germany', city: 'Berlin' },
  { first: 'Paul', last: 'Topolski', username: '@P_Topolski', email: 'ptopolski@gmail.com', country: 'Poland', city: 'Warsaw' },
  { first: 'Anna', last: 'Doe', username: '@andy', email: 'annadoe@gmail.com', country: 'Spain', city: 'Madrid' }
];
dateOptionsSelect: object[] = [
  { value: '1', label: 'Today' },
  { value: '2', label: 'Yesterday' },
  { value: '3', label: 'Last 7 days' },
  { value: '4', label: 'Last 30 days' },
  { value: '5', label: 'Last week' },
  { value: '6', label: 'Last month' }
];

 bulkOptionsSelect: object[] = [
  { value: '1', label: 'Delete' },
  { value: '2', label: 'Export' },
  { value: '3', label: 'Change segment' }
];

 showOnlyOptionsSelect: object[] = [
  { value: '1', label: 'All (2000)' },
  { value: '2', label: 'Never opened (200)' },
  { value: '3', label: 'Opened but unanswered (1800)' },
  { value: '4', label: 'Answered (200)' },
  { value: '5', label: 'Unsunscribed (50)' }
];

 filterOptionsSelect: object[] = [
  { value: '1', label: 'Contacts in no segments (100)' },
  { value: '2', label: 'Segment 1  (2000)' },
  { value: '3', label: 'Segment 2  (1000)' },
  { value: '4', label: 'Segment 3  (4000)' }
];

private sorted = false;


  constructor(private tableService: MdbTableService,private cdRef: ChangeDetectorRef) { }

  @HostListener('input') oninput() {
    this.mdbPagination.searchText = this.searchText;
  }

  ngOnInit() {
    for (let i = 1; i <= 20; i++) {
      this.elements.push({ id: i.toString(), first: 'Wpis ' + i, last: 'Last ' + i, handle: 'Handle ' + i });
    }

    this.tableService.setDataSource(this.elements);
    this.elements = this.tableService.getDataSource();
    this.previous = this.tableService.getDataSource();
  }

  ngAfterViewInit() {
    this.mdbPagination.setMaxVisibleItemsNumberTo(3);
    this.firstItemIndex = this.mdbPagination.firstItemIndex;
    this.lastItemIndex = this.mdbPagination.lastItemIndex;

    this.mdbPagination.calculateFirstItemIndex();
    this.mdbPagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  addNewRow() {
    // tslint:disable-next-line:max-line-length
    this.tableService.addRow({ id: this.elements.length.toString(), first: 'Wpis ' + this.elements.length, last: 'Last ' + this.elements.length, handle: 'Handle ' + this.elements.length });
    this.emitDataSourceChange();
  }

  addNewRowAfter() {
    this.tableService.addRowAfter(1, { id: '2', first: 'Nowy', last: 'Row', handle: 'Kopytkowy' });
    this.tableService.getDataSource().forEach((el, index) => {
      el.id = (index + 1).toString();
    });
    this.emitDataSourceChange();
  }

  removeLastRow() {
    this.tableService.removeLastRow();
    this.emitDataSourceChange();
    this.tableService.rowRemoved().subscribe((data) => {
      console.log(data);
    });
  }

  removeRow() {
    this.tableService.removeRow(1);
    this.tableService.getDataSource().forEach((el, index) => {
      el.id = (index + 1).toString();
    });
    this.emitDataSourceChange();
    this.tableService.rowRemoved().subscribe((data) => {
      console.log(data);
    });
  }

  emitDataSourceChange() {
    this.tableService.dataSourceChange().subscribe((data: any) => {
      console.log(data);
    });
  }

  onNextPageClick(data: any) {
    this.firstItemIndex = data.first;
    this.lastItemIndex = data.last;
  }

  onPreviousPageClick(data: any) {
    this.firstItemIndex = data.first;
    this.lastItemIndex = data.last;
  }

  searchItems() {
    const prev = this.tableService.getDataSource();

    if (!this.searchText) {
      this.tableService.setDataSource(this.previous);
      this.elements = this.tableService.getDataSource();
    }

    if (this.searchText) {
      this.elements = this.tableService.searchLocalDataBy(this.searchText);
      this.tableService.setDataSource(prev);
    }

    this.mdbPagination.calculateFirstItemIndex();
    this.mdbPagination.calculateLastItemIndex();

    this.tableService.searchDataObservable(this.searchText).subscribe((data: any) => {
      if (data.length === 0) {
        this.firstItemIndex = 0;
      }

    });
  }
///////Second Table
sortBy(by: string | any): void {

  this.tableData.sort((a: any, b: any) => {
    if (a[by] < b[by]) {
      return this.sorted ? 1 : -1;
    }
    if (a[by] > b[by]) {
      return this.sorted ? -1 : 1;
    }

    return 0;
  });

  this.sorted = !this.sorted;
}

 }
