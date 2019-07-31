import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-create-finance',
  templateUrl: './create-finance.component.html',
  styleUrls: ['./create-finance.component.scss']
})
export class CreateFinanceComponent implements OnInit {

public Editor = ClassicEditor;
public model = {
editorData: '<p>Hello, world!</p>'
};

  constructor() { }

  ngOnInit() {
      // console.log("Editor: "+this.model.editorData)
  }

}
