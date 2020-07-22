import { Component, OnInit, Input } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap";

@Component({
  selector: "app-model",
  templateUrl: "./model.component.html",
  styleUrls: ["./model.component.scss"],
})
export class SanefModelComponent implements OnInit {
  @Input() data: any;
  trandata: any;

  // Details
  isData: boolean;
  isLoading: boolean;

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {}
}
