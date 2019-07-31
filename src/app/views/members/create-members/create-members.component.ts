import { Component, OnInit } from '@angular/core';
import {AsdevApiService} from '../../../providers/asdev-api.service'
@Component({
  selector: 'app-create-members',
  templateUrl: './create-members.component.html',
  styleUrls: ['./create-members.component.scss']
})
export class CreateMembersComponent implements OnInit {
  titleSelect: Array<any> = [];
//   public Editor = ClassicEditor;
//   public model = {
//     editorData: '<p>Hello, world!</p>'
// };
  constructor(private asdevService: AsdevApiService) { }

  ngOnInit() {
    this.titleSelect = [
      {value: 'Barrister', label: 'Barrister'},
      {value: 'Chief', label: 'Chief'},
      {value: 'Comrade', label: 'Comrade'},
      {value: 'Dr', label: 'Dr'},
      {value: 'Engr', label: 'Engr'},
      {value: 'Mr', label: 'Mr'},
      {value: 'Ogbueshi', label: 'Ogbueshi'},
      {value: 'Ogbueshi Nabo', label: 'Ogbueshi Nabo' },
      {value: 'Pastor', label: 'Pastor'},
      {value: 'Prof', label: 'Prof'},
      {value: 'Sir', label: 'Sir'},
    ]
  }

  doLogin(){
    // console.log("Editor: "+this.model.editorData)
  }
  doRegister(){
//
  let loginDetails: {};
  this.asdevService.login('+2348098367527', '0000').then(dets=>{
    console.log('Login Dets: ' + dets);
  })
  }

}
