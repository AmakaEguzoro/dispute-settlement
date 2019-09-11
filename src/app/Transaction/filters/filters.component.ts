import { Component, OnInit } from '@angular/core';
import { IMyOptions } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  // optionsSelect: Array<any>;
  disabled: boolean = true;
  constructor() { }

  ngOnInit() {

  }
  public myDatePickerOptions: IMyOptions = {
    // Your options
    };
  vendType = [
    { value: '1', label: 'ALL' },
    { value: '2', label: 'B2B' },
    { value: '3', label: 'ITEX' },
  ];
  status = [
    { value: '1', label: 'ALL' },
    { value: '2', label: 'Failed' },
    { value: '3', label: 'Successful' },
    { value: '4', label: 'Declined' },
    { value: '5', label: 'Debited' },
  ];
  method = [
    { value: '1', label: 'ALL' },
    { value: '2', label: 'Cash' },
    { value: '3', label: 'Card' },
  ];
  Type = [
    { value: '1', label: 'ALL' },
    { value: '2', label: 'Postpaid' },
    { value: '3', label: 'Prepaid' },
    { value: '4', label: 'Smart Card' },
    { value: '5', label: 'Token' },
    { value: '6', label: 'Non Energy' },
  ];
  channels = [
    { value: '1', label: 'ALL' },
    { value: '2', label: 'POS' },
    { value: '3', label: 'ANDROID' },
    { value: '4', label: 'WEB' },
    { value: '5', label: 'ANDROIDPOS' },
    { value: '6', label: 'DEFAULT' },
    { value: '7', label: 'OTHERS' },
  ];
  Ref = [
    { value: '1', label: 'Terminal ID'  },
    { value: '2', label: 'Agent ID' },
    { value: '3', label: 'Sequence Number'  },
    { value: '4', label: 'Receipt Number'},
    { value: '5', label: 'Debit Reference' },
    { value: '6', label: 'Retrieval Reference Number' },
    { value: '7', label: 'Transaction Reference' },
    { value: '8', label: 'Account number' },
    { value: '9', label: 'Phone Number' }
    ];
    vendors = [
      { value: '1', label: 'Itex'  },
      { value: '2', label: 'Gecharl Resources' },
      { value: '3', label: 'PhilTech Solutions'  },
      { value: '4', label: 'Vella'},
      { value: '5', label: 'GI Solutions' },
      { value: '6', label: 'Karosealliance' },
      { value: '7', label: 'Payant' },
      { value: '8', label: 'Now Now' },
      { value: '9', label: 'Mars Konnect' },
      { value: '10', label: 'FCube' },
      { value: '11', label: 'Zenith Vas' },
      { value: '12', label: 'XchangeBox' },
      { value: '13', label: 'Daphty' },
      { value: '14', label: 'GreyStone' },
      { value: '15', label: 'Call Phone' }
      ];
      products = [
        { value: '1', label: 'IKEDC'  },
        { value: '2', label: 'TRANSFER' },
        { value: '3', label: 'WITHDRAWAL'  },
        { value: '4', label: 'EKEDC'},
        { value: '5', label: 'MULTICHOICE' },
        { value: '6', label: 'EEDC' },
        { value: '7', label: 'PHED' },
        { value: '8', label: 'AEDC' },
        { value: '9', label: 'MTN-VTU' },
        { value: '10', label: 'IBEDC' },
        { value: '11', label: 'MTN-DATA' },
        { value: '12', label: 'GLO-VTU' },
        { value: '13', label: 'AIRTEL-VTU' },
        { value: '14', label: 'AIRTEL-PIN' },
        { value: '15', label: 'GLO-DATA' },
        { value: '16', label: 'RCN_FUND' },
        { value: '17', label: 'ETISALAT-VTU' },
        { value: '18', label: 'KEDCO' },
        { value: '19', label: 'STARTIMES' },
        { value: '20', label: 'GERRAD HOSPITAL' }
        ];
}
