import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-create-elections',
  templateUrl: './create-elections.component.html',
  styleUrls: ['./create-elections.component.scss']
})
export class CreateElectionsComponent implements OnInit {

public Editor = ClassicEditor;
public model = {
editorData: '<p>Hello, world!</p>'
};

  constructor() { }

  ngOnInit() {
      // console.log("Editor: "+this.model.editorData)
  }

}
