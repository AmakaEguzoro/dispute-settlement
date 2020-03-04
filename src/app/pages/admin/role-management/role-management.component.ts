import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/_auth/auth.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormBuilder } from '@angular/forms';
import { UserModalComponent } from './user-modal/user-modal.component';
import { Register } from 'app/_models/register';
import { Users } from 'app/_models/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss']
})
export class RoleManagementComponent implements OnInit {
  users: any;
  loading = true;
  isData: boolean;
  bsModalRef: BsModalRef;
  perPage = 50;
  currentPage = 1;
  maxSize = 10;
  serial: number;
  lastPage: number;
  searchString: string;
  index;

  constructor(private authService: AuthService,
    private modalService: BsModalService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.isData = true;
    this.loading = true;
    this.authService.getUsers().subscribe((data: any) => {
      this.loading = false;
      this.users = data.data;
      this.serial = 1 + (this.currentPage - 1) * this.perPage;
    }, error => {
      this.isData = false;
      this.loading = false
      console.log('cant get users- ', error);

    });
  }
  // updateSample(index: any, modal) {
  //   // modal =this.users.response;
  //   this.index = index;
  //   this.users = { ...this.users[index]}
  //   this.bsModalRef = this.modalService.show(modal,
  //     Object.assign({}, { class: 'gray modal-lg' })
  //   );
  // }
  // update(item) {
  //   this.users[this.index] = item;
  // }
  headElements = ['S/N', 'NAME', 'USERNAME', 'EMAIL', 'ROLE', 'DATE', 'EDIT', 'REMOVE'];

  openModal(modal) {
    this.users.response = modal;
    const initialState = {
      data: this.users.response,
      // user,
      ignoreBackdropClick: true,
    };
    this.bsModalRef = this.modalService.show(UserModalComponent, { initialState });
  }
  // editPost(id: number) {
  //   this.authService.changePostId(id);

  //   this.bsModalRef = this.modalService.show(UserModalComponent);
  //   this.bsModalRef.content.event.subscribe(result => {
  //     if (result == 'OK') {
  //       setTimeout(() => {
  //         this.getUsers();
  //       }, 5000);
  //     }
  //   });
  // }

  // editUser(item) {
  //   let load = {
  //     "username":item.username
  //   }
  //   this.authService.editUsers(load).subscribe(data => {
  //     console.log("added -", data);

  //   }, error => {
  //     console.log('edit error -', error);

  //   })
  // }

  pageChanged(event: any): void {
    this.loading = true;
    this.currentPage = event.page;
    this.getUsers();
    this.router.navigate(['/users'], { queryParams: { page: this.currentPage } });
  };

}
