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
  validate: any;
  fileUrl;
  @ViewChild("validate") basicModal: ModalDirective;
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

  validateagent(id) {
    id = this.agentData.userTID;
    console.log(id);
    this.loading = true;
    this.agentService.validateAgent(id).subscribe(
      (data: any) => {
        this.loading = false;
        this.validate = data;
        this.toastService.success("Agent Validated");
        this.basicModal.hide();
        this.ngOnInit();
      },
      (error) => {
        this.loading = false;
        this.toastService.error("Error In Agent Validation");
        this.basicModal.hide();
        console.log("cant validate agent", error);
      }
    );
  }

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
