import { ModalDirective } from "./../../../../lib/ng-uikit-pro-standard/free/modals/modal.directive";
import { AgentserviceService } from "./../../../_service/agentservice.service";
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  Renderer2,
} from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  ToastService,
  ButtonsModule,
  WavesModule,
  CollapseModule,
} from "ng-uikit-pro-standard";
@Component({
  selector: "app-agentdetail",
  templateUrl: "./agentdetail.component.html",
  styleUrls: ["./agentdetail.component.scss"],
})
export class AgentdetailComponent implements OnInit {
  @Output() reload = new EventEmitter<string>();
  validate: any;
  fileUrl;
  @ViewChild("validate") basicModal: ModalDirective;
  @ViewChild("success") successModal: ModalDirective;
  ProfilePic: any;
  constructor(
    private agentService: AgentserviceService,
    private toastService: ToastService,
    private button: ButtonsModule,
    private renderer: Renderer2,
    public sanitizer: DomSanitizer
  ) {}
  @ViewChild("save") savebtn: ElementRef;
  @ViewChild("downloadimg") downloadimg: ElementRef;
  @Input() showing;
  @Input() agentData;
  @Output() displayhome = new EventEmitter();
  loading: boolean;

  ngOnInit() {}
  disableApprove: boolean = false;
  validateagent(id) {
    id = this.agentData.userTID;
    console.log(id);
    this.loading = true;
    this.agentService.validateAgent(id).subscribe(
      (data: any) => {
        if (data.status == 200) {
          this.loading = false;
          this.disableApprove = true;
          this.basicModal.hide();
          this.successModal.show();
          this.toastService.success(data.message || "Agent Validated");

          this.reload.next();
        }
      },
      (error) => {
        this.loading = false;
        this.toastService.error("Error In Agent Validation");
        this.basicModal.hide();
        console.log("cant validate agent", error);
      }
    );
  }

  // onopen(id = this.agentData.userTID) {
  //   this.reload.next();
  // }
  // download(text, name, type) {
  //   let a = this.savebtn;
  //   let file = new Blob([text], { type: type });
  //   this.renderer.setAttribute(this.savebtn, href, file);
  // }\

  // DownloadProfilePic() {
  //   var url = this.downloadimg.nativeElement.src;
  //   window.open(url, "_parent", "download");
  // }
}
