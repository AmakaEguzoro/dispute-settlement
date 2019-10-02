import { UserModalService } from './../../../../_service/user-modal.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Users } from 'app/_models/users';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'app/_auth/auth.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {
  @Input() data: any;
  editPostForm: FormGroup;
  name: string;
  // users:any;
  // id: number;
  // postData: any;
  // event: EventEmitter<any> = new EventEmitter();
  constructor(private userModal: UserModalService, public bsModalRef: BsModalRef, private fb: FormBuilder,
    private authService: AuthService) {

    // this.editPostForm.controls['description'].setValue(this.postData.description);
    // this.editPostForm = this.fb.group({
    //   is_admin: new FormControl(null, []),
    //   username: new FormControl('', []),
    // description: new FormControl('', [])
    // });
  }

  ngOnInit() {
    // this.editPostForm = new FormGroup({
    //   username: new FormControl(this.data.username)
    // });
    // console.log(this.data);
    this.name = this.data.username;
    this.editPostForm = this.fb.group({
      username: ['', [Validators.required]],
      
    })
    // this.authService.getUsers().subscribe((data: any)=> {
    //   this.users= data.data;
    //   console.log(this.users);

    // }, error => {
    //   console.log('error getting usermodal data', error);
    // });
    // this.authService.postIdData.subscribe(data => {
    //   this.id = data;
    //   if(this.editPostForm!=null && this.postData!=null) {
    //     this.editPostForm.controls['is_admin'].setValue(this.postData.is_admin);
    //     this.editPostForm.controls['username'].setValue(this.postData.username);
    //   }
    // }, error  => {
    //   console.log('cant get post details ', error);
    // });
  }

  onButtonClicked() {
    // console.log(this.editPostForm.value);
    // return;
    this.userModal.submitModal(this.editPostForm.value)
      .subscribe(newName => {
        console.log(newName);
      }, error => {
        console.log(error.message);
      });
  }

  // onPostEditFormSubmit() {
  //   let postData = {
  //     'id': this.id,
  //     'username': this.editPostForm.get('username').value,
  //     // 'Description': this.editPostForm.get('description').value,
  //     // 'is_admin': this.editPostForm.get('cateis_admingory').value,s
  //   };


  //   this.authService.editUsers(postData).subscribe(data => {      
  //       this.event.emit('OK');
  //       this.bsModalRef.hide();  
  //       console.log(postData);    
  //   });
  // }

  // onClose() {
  //   this.bsModalRef.hide();
  // }

}
